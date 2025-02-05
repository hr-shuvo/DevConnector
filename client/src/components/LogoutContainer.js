import {useState} from "react";
import {useDashboardContext} from "../pages/DashboardLayout";
import Wrapper from "../assets/wrappers/LogoutContainer";
import {FaCaretDown, FaUserCheck, FaUserCircle} from "react-icons/fa";
import {IoSettingsOutline} from "react-icons/io5";

const LogoutContainer = () => {

    const [showLogout, setShowLogout] = useState(false);
    const {user, logoutUser} = useDashboardContext();


    return (
        <Wrapper>
            <button type='button' className='btn logout-btn' onClick={() => setShowLogout(!showLogout)}>
                <FaUserCircle/>
                {user?.name}
                <FaCaretDown/>
            </button>


            <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
                <button type='button' className='dropdown-btn'>profile</button>
                <button type='button' className='dropdown-btn'> settings</button>
                <button type='button' className='dropdown-btn' onClick={logoutUser}>logout</button>

            </div>
        </Wrapper>
    );

};

export default LogoutContainer;



