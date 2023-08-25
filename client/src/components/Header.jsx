import BellIcon from '../assets/icons/bell-icon.svg';
import ProfileIcon from '../assets/icons/profile-icon.svg';
import SearchIcon from '../assets/icons/search-icon.svg';
import DropDownIcon from '../assets/icons/arrow-drop-down-line-icon.svg';

export default function Header() {
	return (
		<>
			<header className="header">
				<div>
					<h1>Panel de proyectos</h1>
					<p>Version 1.0.0</p>
				</div>
				<div>
					<img src={SearchIcon} alt="" />
					<img src={BellIcon} alt="" />
					<img src={ProfileIcon} alt="" />
					<img src={DropDownIcon} alt="" />
				</div>
			</header>
		</>
	);
}
