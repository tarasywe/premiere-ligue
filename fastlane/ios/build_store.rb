desc "Build iOS to Test Flight(Production)"
private_lane :build_ios_store do |options|
  ENV["FASTLANE_APPLE_APPLICATION_SPECIFIC_PASSWORD"] = options[
    :applicationPassword
  ]

  update_ios_signings

  build_app(
    scheme: ENV["IOS_SCHEME"],
    workspace: ENV["IOS_WORKSPACE"],
    configuration: "Release",
    export_method: "app-store",
    output_directory: "./build",
    output_name: "wikirnapp.ipa",
    clean: true,
    silent: true,
    suppress_xcode_output: true,
    export_options: {
      signingStyle: "manual",
      provisioningProfiles: {
        "com.tmakota.wiki": "match AppStore com.tmakota.wiki"
      }
    }
  )

  tag_match_pattern = "ios/store/*"
  changelog =
    changelog_from_git_commits(
      tag_match_pattern: tag_match_pattern,
      merge_commit_filtering: "exclude_merges"
    )

  pilot(
    ipa: "build/wikirnapp.ipa",
    skip_waiting_for_build_processing: true,
    skip_submission: true,
    notify_external_testers: false,
    username: ENV["ISTORE_USERNAME"],
    uses_non_exempt_encryption: false,
    itc_provider: ENV["APPLE_TEAM_ID"],
    changelog: changelog
  )
end
