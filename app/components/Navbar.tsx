import React from "react";
import Logo from "./Logo";
import SearchBarProfile from "./SearchBarProfile";
import ProfileButton from "./ProfileButtonModal";
import LoginModal from "./LoginModal";

const Navbar = ({
  showLogo = true,
  showSearchBar = true,
  showProfileButton = true,
  showLoginModal = true,
}) => {
  return (
    <div className="flex justify-between w-full items-center p-2 absolute">
      {showLogo && <Logo />}

      {showSearchBar && <SearchBarProfile />}
      <div className="flex items-center gap-10 mr-10">
        {showLoginModal && <LoginModal />}
        {showProfileButton && <ProfileButton />}
      </div>
    </div>
  );
};

export default Navbar;
