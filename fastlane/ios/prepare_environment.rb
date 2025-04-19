private_lane :install_certificates do
  create_keychain_match
end

desc "Create temporary keychain"
private_lane :create_keychain_match do
  create_keychain(
    name: ENV["MATCH_KEYCHAIN_NAME"],
    password: ENV["MATCH_KEYCHAIN_PASSWORD"],
    default_keychain: false,
    unlock: true,
    timeout: 3600,
    lock_when_sleeps: false
  )

  unlock_keychain(
    path: ENV["MATCH_KEYCHAIN_NAME"],
    add_to_search_list: true,
    password: ENV["MATCH_KEYCHAIN_PASSWORD"],
    set_default: false
  )
end

desc "Removed imported signing certificates"
private_lane :removeCertificates do
  # Clean up temporary keychain
  delete_keychain(name: ENV["MATCH_KEYCHAIN_NAME"])
end
