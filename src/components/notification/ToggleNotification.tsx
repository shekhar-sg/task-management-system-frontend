import {BellDot} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useGlobalStore} from "@/stores/global.store";

const ToggleNotification = () => {
  const { openContextPanel } = useGlobalStore();
  return (
    <Button variant={"default"} size={"icon"} onClick={() => openContextPanel("NOTIFICATIONS")}>
      <BellDot />
    </Button>
  );
};

export default ToggleNotification;
