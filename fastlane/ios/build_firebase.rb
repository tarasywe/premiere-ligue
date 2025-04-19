desc "Build iOS for Firebase(Staging)"
private_lane :build_ios_firebase do
  # Verify next release
  next unless verify(tag_prefix: "ios/firebase/*")
  build_ios
  post_deploy_firebase(ios: true)
end

desc "Build iOS"
private_lane :build_ios do
  next_version = lane_context[SharedValues::RELEASE_NEXT_VERSION]
  increment_build(platform: :ios, version_number: next_version)

  update_ios_signings

  update_bundle_versions

  build_app(
    scheme: ENV["IOS_SCHEME"],
    workspace: ENV["IOS_WORKSPACE"],
    configuration: "Release",
    export_method: "ad-hoc",
    output_directory: "./build",
    output_name: "wikirnapp.ipa",
    clean: true,
    silent: true,
    suppress_xcode_output: true,
    export_options: {
      signingStyle: "manual",
      provisioningProfiles: {
        "com.tmakota.wiki": "match AdHoc com.tmakota.wiki"
      }
    }
  )
end
