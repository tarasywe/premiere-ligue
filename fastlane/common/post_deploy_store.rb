desc "Generates release notes for slack and create the release tag"
private_lane :post_deploy_store do |options|
  build_number = options[:build_number]
  version = options[:version]

  deploy_resource = nil
  build_type = nil

  base_title = "#{version}(#{build_number})"
  base_tag = "#{version}/#{build_number}"

  if options[:ios]
    deploy_resource = "Test Flight"
    build_type = "iOS"
    tag_match_pattern = "ios/store/*"
    tag = "ios/store/#{base_tag}"
    title = "iOS #{base_title}"

    message =
      changelog_from_git_commits(
        tag_match_pattern: tag_match_pattern,
        merge_commit_filtering: "exclude_merges"
      )
    message = "#{deploy_resource} \n" + message
    add_git_tag(tag: tag, force: true, message: message)
    push_git_tags(tag: tag, force: true)
  end
  if options[:android]
    deploy_resource = "Google Play for Internal testers"
    build_type = "Android"
    tag_match_pattern = "android/store/*"
    tag = "android/store/#{base_tag}"
    title = "Android #{base_title}"

    message =
      changelog_from_git_commits(
        tag_match_pattern: tag_match_pattern,
        merge_commit_filtering: "exclude_merges"
      )

    message = "#{deploy_resource} \n" + message
    add_git_tag(tag: tag, force: true, message: message)
    push_git_tags(tag: tag, force: true)
  end

rescue => e
  # Catch the error and throw a warning message instead
  UI.message("❗COULD NOT CREATE TAGS - #{e.message}")
end
