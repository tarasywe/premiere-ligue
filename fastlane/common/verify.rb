desc "Verify next release"
private_lane :verify do |options|
  tag_prefix = options[:tag_prefix]
  # Check if there is any change since last version
  is_releaseable = analyze_commits(match: tag_prefix)
end
