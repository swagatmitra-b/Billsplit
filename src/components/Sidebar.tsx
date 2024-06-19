import CreateGroup from "./CreateGroup";
import JoinGroup from "./JoinGroup";

const Sidebar = () => {
  return (
    <div className="flex h-screen flex-col justify-start gap-4  py-4">
      <CreateGroup />
      <JoinGroup />
    </div>
  );
};

export default Sidebar;
