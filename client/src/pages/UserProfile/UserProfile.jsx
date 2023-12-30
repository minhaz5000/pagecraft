import React, { useState } from "react";
import DefaultTopbar from "../../Components/DefaultTopbar/DefaultTopbar";
import userImg from "./sami.png";
import "./UserProfile.css";
function UserProfile() {
  const [userEdit, setuserEdit] = useState(false);
  function toggleedit() {
    setuserEdit(!userEdit);
  }
  const [userPhoneEdit, setPhoneEdit] = useState(false);
  function togglePhoneEdit() {
    setPhoneEdit(!userPhoneEdit);
    console.log(userPhoneEdit);
  }

  const user = JSON.parse(localStorage.getItem("logged-in-user"));

  return (
    <div className="userprofile">
      <DefaultTopbar />
      <h1 className="userprofiletitle">Customize Your Profile</h1>

      <div className="profilegrid">
        {/* <div className='dp'> */}
        <img src={userImg} className="dp" />
        {/* </div> */}
        <div className="information">
          <div className="emailusername">
            <h3 className="infotitle">Account Information</h3>
            <form>
              <div className={userEdit ? "accountinfo" : "accountinfonogap"}>
                <label className="emailofaccount">Email:</label>
                <input
                  className="userinfoinput"
                  type="text"
                  name="email"
                  placeholder={user.email}
                  disabled={true}
                />
                <label className="usernameofaccount">Username:</label>
                <div className="usernametoggle">
                  <button
                    onClick={toggleedit}
                    className={
                      userEdit
                        ? "editbuttonsettings"
                        : "editbuttonsettingsclicked"
                    }
                    type="button"
                  >
                    Edit
                  </button>
                  <input
                    className="userinfoinput"
                    type="text"
                    name="username"
                    placeholder={user.handle}
                    required
                    disabled={userEdit}
                  />
                </div>
                <label className="usernameofaccount"></label>
                <div
                  className="saveaccountinfo"
                  hidden={userEdit ? true : false}
                >
                  <button className="save" type={"submit"} value="Submit">
                    Save
                  </button>
                  <span />
                  <button className="cancel" type={"reset"}>
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="passwordchange">
            <h3 className="infotitle">Change Password</h3>
            <form>
              <div className="accountinfo">
                <label className="passwordofaccount">Current Password:</label>
                <input
                  className="userinfoinput"
                  type="password"
                  name="password"
                  placeholder="Current Password"
                  required
                />
                <label className="newpasswordofaccount">New Password:</label>
                <input
                  className="userinfoinput"
                  type="password"
                  name="newpassword"
                  placeholder="Provide New Password"
                  required
                />
                <label className="confirmnewpassword">
                  Confirm New Password:
                </label>
                <input
                  className="userinfoinput"
                  type="password"
                  name="confirmpassword"
                  placeholder="Confirm new password"
                  required
                />
                <label className="usernameofaccount"></label>
                <div className="saveaccountinfo">
                  <button className="save" type={"submit"} value="Submit">
                    Save
                  </button>
                  <span />
                  <button className="cancel" type={"reset"}>
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* <div className="phonenumber">
            <h3 className="infotitle">Phone Number</h3>
            <form>
              <div className={userEdit ? "accountinfo" : "accountinfonogap"}>
                <label className="phoneofaccount">Phone:</label>
                <div className="usernametoggle">
                  <button
                    onClick={togglePhoneEdit}
                    className={
                      userPhoneEdit
                        ? "editbuttonsettings"
                        : "editbuttonsettingsclicked"
                    }
                    type="button"
                  >
                    Edit
                  </button>
                  <input
                    className="userinfoinput"
                    type="text"
                    name="phone"
                    placeholder="Query from database"
                    required
                    disabled={userPhoneEdit}
                  />
                </div>
                <label className="usernameofaccount"></label>
                <div
                  className="saveaccountinfo"
                  hidden={userPhoneEdit ? true : false}
                >
                  <button className="save" type={"submit"} value="Submit">
                    Save
                  </button>
                  <span />
                  <button className="cancel" type={"reset"}>
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
