desc "Import ios certificate with fastlane match"
private_lane :get_ios_certificate do |options|
  match(
    type: options[:type],
    app_identifier: ENV["IOS_BUNDLE_ID"],
    git_url: ENV["MATCH_REPO"],
    username: ENV["ISTORE_USERNAME"],
    keychain_name: ENV["MATCH_KEYCHAIN_NAME"],
    keychain_password: ENV["MATCH_KEYCHAIN_PASSWORD"],
    force_for_new_devices: true,
    force_legacy_encryption: true
  )
end
