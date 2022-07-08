import React from "react";
import "./Styles/HeaderBar.css";
import Profilelogo from "./Assets/User-Profile.svg";
import dropdownicon from "./Assets/white-drop-down.svg";
export function HeaderBar() {
  return (
    <div className="Header">
      <div
        className="Header-text fs-18"
        data-testid="header-application-stacks"
      >
        Application Stacks
      </div>
      <div className="Header-username" data-testid="header-james-smith">
        James Smith
      </div>
      <div className="Header-profileimage">
        <object
          data={Profilelogo}
          type="image/svg+xml"
          data-testid="header-profile-logo"
        />
      </div>
      <div className="Header-dropdownicon">
        <object data={dropdownicon} type="image/svg+xml" />
      </div>
      <div className="Header-userrole" data-testid="header-product-arch">
        Product Architect
      </div>
    </div>
  );
}
