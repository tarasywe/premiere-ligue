desc "Build Android for Maestro E2E testing"
private_lane :android_e2e do
  sh "bash ./secrets.sh"
  gradle_clean_build
  next_version = "1.2.0"
  flavor = "dev"

  build_type = ENV["ANDROID_BUILD_TYPE_DEV_RELEASE"]
  brazeApiKey = ENV["BRAZE_API_KEY_ANDROID_STG"]

  android_set_version_code(
    version_code: 100,
    gradle_file: ENV["ANDROID_GRADLE"]
  )
  android_set_version_name(
    gradle_file: ENV["ANDROID_GRADLE"],
    version_name: next_version.to_s
  )
  gradle(
    task: ENV["ANDROID_BUILD_TASK"],
    properties: {
      "BRAZE_API_KEY_ANDROID" => brazeApiKey,
      "BRAZE_SDK_ENDPOINT" => ENV["BRAZE_SDK_ENDPOINT"],
      "CodePushDeploymentKey" => ENV["ANDROID_APP_KEY"]
    },
    build_type: build_type,
    project_dir: ENV["ANDROID_DIR"],
    print_command_output: true,
    flavor: flavor
  )
end
