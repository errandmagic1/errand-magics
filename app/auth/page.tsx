import { AuthTabs } from "@/components/auth-tabs"
import { LottiePlayer } from "@/components/lottie-player"
import deliveryAnimation from "@/data/delivery-animation.json"

export default function LoginPage() {
  return (
    <div className="mobile-container">
      {/* Header with Logo and Animation */}
      <div className="flex flex-col items-center pt-8">
        <div className="mb-4">
          <div className="flex justify-center mb-2 animate-in fade-in zoom-in duration-700">
            <img src="/errand-magics-logo.png?v=1" alt="ErrandMagics Logo" className="h-44 w-auto object-contain" />
          </div>
          <p className="text-xs font-medium text-muted-foreground text-center mt-2 px-8 leading-relaxed italic border-t border-gray-100 pt-4">
            Quick Commerce Platform - World-class delivery for groceries, vegetables, fruits, medicine, and food
          </p>
        </div>

        {/* Lottie Animation */}
        <div className="w-32 h-32 ">
          <LottiePlayer
            animationData={deliveryAnimation}
            className="w-full h-full"
            autoplay={true}
            loop={true}
            speed={1}
          />
        </div>
      </div>

      {/* Auth Tabs */}
      <div className="flex-1 px-6 pb-8">
        <AuthTabs />
      </div>

      {/* Footer */}
      <div className="px-6 pb-6">
        <p className="text-xs text-center text-muted-foreground">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}
