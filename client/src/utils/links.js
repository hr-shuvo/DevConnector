import {FaWpforms} from "react-icons/fa";
import {MdAdminPanelSettings, MdQueryStats} from "react-icons/md";
import {ImProfile} from "react-icons/im";


const links = [
    {
        text: 'add job',
        path: '.', // dot means the root path / dashboard
        icon: <FaWpforms/>
    },
    {
        text: 'all jobs',
        path: 'all-jobs',
        icon: <MdQueryStats/>
    },
    {
        text: 'stats',
        path: 'stats',
        icon: <FaWpforms/>
    },
    {
        text: 'profile',
        path: 'profile',
        icon: <ImProfile/>
    },
    {
        text: 'admin',
        path: 'admin',
        icon: <MdAdminPanelSettings/>
    }

];


export default  links;