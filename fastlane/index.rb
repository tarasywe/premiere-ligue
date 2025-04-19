desc "Firebase builds"
lane :firebase do |options|
  platform = options[:platform]

  if platform.nil?
    UI.user_error!(
      "No platform provided. Please specify a platform using 'platform: :ios' or 'platform: :android'"
    )
  end

  build_ios_firebase if platform == "ios"
  build_android_firebase if platform == "android"
end

desc "Store builds"
lane :store do |options|
  platform = options[:platform]

  if platform.nil?
    UI.user_error!(
      "No platform provided. Please specify a platform using 'platform: :ios' or 'platform: :android'"
    )
  end

  if platform == "ios"
    build_ios_store(applicationPassword: options[:applicationPassword])
  end

  build_android_store if platform == "android"
end

desc "E2E Testing"
lane :e2e do
  android_e2e
end


desc "Increment App version and build number"
lane :update_bundle_versions do
  analyze_commits(match: "android/firebase/*")
  next_version = lane_context[SharedValues::RELEASE_NEXT_VERSION]

  update_app_json(version: next_version)
end

desc "Import ios certificates of DEV, ADHOC and APPSTORE, allows to add new devices for adhoc testing"
lane :update_ios_signings do
  install_certificates()

  get_ios_certificate(type: "development")
  get_ios_certificate(type: "adhoc")
  get_ios_certificate(type: "appstore")
end

desc "Commit changes from latest firebase build"
lane :latest_changes do
  analyze_commits(match: "ios/firebase/*")
end
