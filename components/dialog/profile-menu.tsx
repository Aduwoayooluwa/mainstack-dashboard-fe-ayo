import { IntegrationsIcon, PurchaseHistoryIcon, ReferEarnIcon, ReportBugIcon, SettingsIcon, SwitchAccountIcon, SignOutIcon } from "@/assets/icons/profile-setting-icons";
import { getInitials } from "@/lib/utils";



export function ProfileMenu({ profile }: { profile: { first_name: string, last_name: string, email: string } }) {
    
    const initials = getInitials(profile?.first_name, profile?.last_name);
    return (
        <div className="max-w-[384px] lg:min-w-[384px] bg-white rounded-[20px] p-4 shadow-lg">
            <div className="flex items-center gap-3 mb-8">
                <div className="font-semibold bg-gradient-to-br from-[#5C6670] to-foreground text-background rounded-full text-sm w-[32px] h-[32px] flex items-center justify-center">
                    {initials}
                </div>
                <div>
                    <h2 className="font-[600] text-lg">{`${profile.first_name} ${profile.last_name}`}</h2>
                    <p className="text-sm">{profile.email}</p>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <button className="flex items-center gap-3 w-full text-left hover:bg-[#EFF1F6] p-2 rounded-lg transition-colors">
                    <SettingsIcon />
                    <span className="font-medium text-sm">Settings</span>
                </button>

                <button className="flex items-center gap-3 w-full text-left hover:bg-[#EFF1F6] p-2 rounded-lg transition-colors">
                    <PurchaseHistoryIcon />
                    <span className="font-medium text-sm">Purchase History</span>
                </button>

                <button className="flex items-center gap-3 w-full text-left hover:bg-[#EFF1F6] p-2 rounded-lg transition-colors">
                    <ReferEarnIcon />
                    <span className="font-medium text-sm">Refer and Earn</span>
                </button>

                <button className="flex items-center gap-3 w-full text-left hover:bg-[#EFF1F6] p-2 rounded-lg transition-colors">
                    <IntegrationsIcon />
                    <span className="font-medium text-sm">Integrations</span>
                </button>

                <button className="flex items-center gap-3 w-full text-left hover:bg-[#EFF1F6] p-2 rounded-lg transition-colors">
                    <ReportBugIcon />
                    <span className="font-medium text-sm">Report Bug</span>
                </button>

                <button className="flex items-center gap-3 w-full text-left hover:bg-[#EFF1F6] p-2 rounded-lg transition-colors">
                    <SwitchAccountIcon />
                    <span className="font-medium text-sm">Switch Account</span>
                </button>
                <button className="flex items-center gap-3 w-full cursor-pointer text-left hover:bg-[#EFF1F6] p-2 rounded-lg transition-colors">
                    <SignOutIcon />
                    <span className="font-medium text-sm">Sign Out</span>
                </button>
            </div>
        </div>
    );
}