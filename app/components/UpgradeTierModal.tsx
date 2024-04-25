"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";

interface iAppProps {
  open: boolean;
  onClose: () => void;
  tier: number;
}

const UpgradeTierModal: React.FC<iAppProps> = ({ onClose, tier, open }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upgrade Tier</DialogTitle>
        </DialogHeader>
        <p className="text-center">
          You need to upgrade your tier to access this feature.{" "}
          <Link href="/subscription" className="text-red-500">
            Upgrade now
          </Link>
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default UpgradeTierModal;
