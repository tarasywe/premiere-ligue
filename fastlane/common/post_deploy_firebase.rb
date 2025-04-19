desc "Generates release notes for slack and create the next tag"
private_lane :post_deploy_firebase do |options|
  next_version = lane_context[SharedValues::RELEASE_NEXT_VERSION]

  base_tag = "#{next_version}"
  build_type = options[:ios] ? "iOS" : "Android"
  icon = options[:ios] ? ":ios:" : ":android:"

  UI.message("BASE TAG: #{base_tag}")

  push_firebase(ios: options[:ios], android: options[:android])
end

private_lane :push_firebase do |options|
  release_notes = generate_release_notes
  groups = "testers"
  testers = ENV["FIREBASE_TESTERS"]
  firebase_cli_token = ENV["FIREBASE_TOKEN"]
  if options[:ios]
    firebase_app_distribution(
      app: ENV["FIREBASE_IOS_APP_ID"],
      testers: testers,
      groups: groups,
      release_notes: release_notes,
      firebase_cli_token: firebase_cli_token
    )
  end
  if options[:android]
    firebase_app_distribution(
      app: ENV["FIREBASE_ANDROID_APP_ID"],
      testers: testers,
      groups: groups,
      release_notes: release_notes,
      firebase_cli_token: firebase_cli_token
    )
  end
end

desc "Generate and truncate release notes"
private_lane :generate_release_notes do |options|
  begin
    notes = ""

    notes =
      conventional_changelog(
        format: "plain",
        display_links: false,
        display_title: false,
        ignore_scopes: %w[chore build]
      )

    # Truncate the notes string to a maximum length of 16,000 characters
    notes = notes.slice(0, 16_000)

    notes
  rescue => e
    UI.message("❗Error generating release notes: #{e.message}")
    ""
  end
end
