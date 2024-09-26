import ProfileForm from "../../components/profile/profile-form";
import ChangePassword from "../../components/profile/changePassword";
import { Link, useParams } from "react-router-dom";
function AccountDetails() {
  const { userId } = useParams();
  return (
    <div>
      <ProfileForm userId={userId} />
      <ChangePassword />
      <Link to={`/profile`}>go back</Link>
    </div>
  );
}
export default AccountDetails;
