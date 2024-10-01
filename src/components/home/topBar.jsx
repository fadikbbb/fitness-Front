
import { CiFacebook,CiInstagram,  CiLinkedin } from "react-icons/ci";
import { BsTelephoneInbound } from "react-icons/bs";
import { BsTwitterX } from "react-icons/bs";

function TopBar() {
  return (
    <div className="flex justify-between items-center p-4 bg-background dark:bg-darkBackground text-text dark:text-darkText">
      {/* Phone number */}
      <a href="tel:+123456789" className="flex gap-2 items-center font-medium">
      <BsTelephoneInbound />
        +123456789
      </a>

      {/* Social Media Icons */}
      <div className="flex space-x-4">
        <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
          <CiFacebook size={20} className="text-[#0866FF] transition-colors duration-200" />
        </a>
        <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
          <BsTwitterX size={20} className="text-black transition-colors duration-200" />
        </a>
        <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
          <CiInstagram size={20} className="text-[#fd1ab9] transition-colors duration-200" />
        </a>
        <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
          <CiLinkedin size={20} className="text-[#0866FF] transition-colors duration-200" />
        </a>
      </div>
    </div>
  );
}

export default TopBar;
