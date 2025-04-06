import { Logo } from "@/assets/logo";
import Link from "next/link";
import AnalyticsIcon from "@/assets/icons/analytics_icon.svg";
import RevenueIcon from "@/assets/icons/revenue_icno.svg";
import CrmIcon from "@/assets/icons/crm_icon.svg";
import HomeIcon from "@/assets/icons/home_icon.svg";
import Image from "next/image";
import NotificationIcon from "@/assets/icons/notifications.svg";
import MenuIcon from "@/assets/icons/menu.svg";
import ChatIcon from "@/assets/icons/chat.svg";
import { useEffect, useRef, useState } from "react";
import { ProfileMenu } from "@/components/dialog/profile-menu";
import { AppsMenu } from "@/components/dialog/apps-menu";
import { getInitials } from "@/lib/utils";
import { AppsIcon } from "@/components/icons/apps-icon";
import ChevronRightIcon from "@/assets/icons/chevron_right.svg";
import { ApiService } from "@/config/api.service";
import { useQuery } from "@tanstack/react-query";
import { ProfileSkeleton } from "@/components/skeletons/profile-skeleton";

const headerItems = [
  {
    label: "Home",
    href: "/",
    icon: HomeIcon,
  },
  {
    label: "Analytics",
    href: "/",
    icon: AnalyticsIcon,
  },
  {
    label: "Revenue",
    href: "/",
    icon: RevenueIcon,
  },
  {
    label: "CRM",
    href: "/",
    icon: CrmIcon,
  },
  {
    label: "Apps",
    icon: AppsIcon,
  },
];

export default function Header() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showAppsMenu, setShowAppsMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const appsRef = useRef<HTMLDivElement>(null);

  const { data: profile, isLoading: isLoadingProfile } = useQuery<User>({
    queryKey: ['user'],
    queryFn: ApiService.getUser
  });

  const initials = getInitials(profile?.first_name ?? '', profile?.last_name ?? '');

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
      if (appsRef.current && !appsRef.current.contains(event.target as Node)) {
        setShowAppsMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const headerActions = [
    {
        label: 'Notifications',
        icon: NotificationIcon,
    },
    {
        label: 'Chat',
        icon: ChatIcon,
    },
    {
        label: 'User panel',
        render: (key: string) => (
            <div className="relative" key={key} ref={menuRef}>
                {isLoadingProfile ? (
                    <ProfileSkeleton />
                ) : (
                    <div className="flex items-center gap-2 bg-[#EFF1F6] rounded-full p-2 cursor-pointer" onClick={() => setShowProfileMenu(!showProfileMenu)}>
                        <span className="text-[16px] font-semibold bg-gradient-to-br from-[#5C6670] to-foreground text-background rounded-full w-[32px] h-[32px] flex items-center justify-center text-sm">{initials}</span>
                        <button className="cursor-pointer">
                            <Image src={MenuIcon} alt="menu" />
                        </button>
                    </div>
                )}
                {showProfileMenu && !isLoadingProfile && (
                    <div className="absolute right-0 top-[calc(100%+8px)] z-50">
                        <ProfileMenu profile={profile ?? { first_name: '', last_name: '', email: '' }} />
                    </div>
                )}
            </div>
        )
    }
  ];

  return (
    <header className="flex fixed top-0 z-10 w-[calc(100%-2rem)] mx-auto bg-white items-center py-2 justify-between shadow rounded-full px-8 h-[64px]">
      <Logo />

      <div className="flex items-center gap-6">
        {headerItems.slice(0, 4).map((item) => (
          <Link
            href={item?.href || ""}
            className={`flex items-center gap-1 py-1 px-3 rounded-full font-semibold text-[16px] ${
              item.label === "Revenue"
                ? "bg-foreground text-background"
                : " bg-background text-[#56616B] hover:bg-[#EFF1F6] transition-colors duration-300"
            }`}
            key={item.label}
          >
            <Image src={item.icon} alt={item.label} />
            <p>{item.label}</p>
          </Link>
        ))}

        {headerItems.slice(4).map((item) => (
          <div className="relative" key={item.label} ref={appsRef}>
            <button
              onClick={() => setShowAppsMenu(!showAppsMenu)}
              className={`flex items-center cursor-pointer gap-2 py-1 px-3 rounded-full font-semibold text-[16px] transition-all duration-300 ${
                showAppsMenu
                  ? "bg-foreground text-background"
                  : "bg-background text-[#56616B] hover:bg-[#EFF1F6] transition-colors duration-300"
              }`}
            >
              <AppsIcon color={showAppsMenu ? "#FFFFFF" : "#56616B"} />
              <div className="flex items-center gap-2">
                {showAppsMenu && (
                  <>
                    <p>Apps</p>
                    <div className="w-[1px] h-[16px] bg-white/30" />
                  </>
                )}
                <p>{showAppsMenu ? "Link in Bio" : item.label}</p>
                {showAppsMenu && (
                  <Image src={ChevronRightIcon} alt="chevron right" className="invert" />
                )}
              </div>
            </button>
            {showAppsMenu && (
              <div className="absolute left-0 top-[calc(100%+24px)] z-50">
                <AppsMenu />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-6">
        {headerActions.slice(0, 2).map((action) => (
            <button key={action.label}>
                <Image src={action.icon} alt={action.label} />
            </button>
        ))}
        {headerActions.slice(2).map((action) => (
            action.render ? action.render(action.label) : null
        ))}
      </div>
    </header>
  );
}
