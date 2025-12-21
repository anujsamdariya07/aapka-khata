import { 
  ArrowRight, 
  BarChart3, 
  PieChart, 
  Wallet, 
  TrendingUp, 
  Shield, 
  Smartphone, 
  Zap,
  Check,
  Star,
  Users,
  Clock,
  Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const LandingPage = () => {
  const features = [
    {
      icon: BarChart3,
      title: "Smart Analytics",
      description: "Get detailed insights into your spending patterns with beautiful charts and intelligent categorization.",
    },
    {
      icon: Wallet,
      title: "Budget Planning",
      description: "Set monthly budgets for different categories and get alerts before you overspend.",
    },
    {
      icon: PieChart,
      title: "Expense Categories",
      description: "Automatically categorize your expenses and see where your money goes at a glance.",
    },
    {
      icon: TrendingUp,
      title: "Financial Goals",
      description: "Set savings goals and track your progress with motivating visualizations.",
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "Your data is encrypted with 256-bit AES encryption. We never share your information.",
    },
    {
      icon: Smartphone,
      title: "Mobile First",
      description: "Access your finances anywhere with our beautifully designed responsive interface.",
    },
  ];

  const stats = [
    { value: "50K+", label: "Active Users", icon: Users },
    { value: "₹500Cr+", label: "Tracked Monthly", icon: TrendingUp },
    { value: "99.9%", label: "Uptime", icon: Zap },
    { value: "4.9/5", label: "User Rating", icon: Star },
  ];

  const steps = [
    {
      step: "01",
      title: "Create Account",
      description: "Sign up in seconds with your email or social accounts. No credit card required.",
    },
    {
      step: "02",
      title: "Add Transactions",
      description: "Manually add expenses or connect your bank for automatic syncing.",
    },
    {
      step: "03",
      title: "Track & Analyze",
      description: "View your spending patterns, set budgets, and achieve your financial goals.",
    },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Freelancer",
      content: "Aapka Khata has completely transformed how I manage my finances. The insights are incredible!",
      rating: 5,
    },
    {
      name: "Rahul Verma",
      role: "Business Owner",
      content: "Finally, an expense tracker that understands Indian spending habits. Love the categories!",
      rating: 5,
    },
    {
      name: "Ananya Patel",
      role: "Student",
      content: "Simple, beautiful, and effective. I've saved 30% more since I started using this app.",
      rating: 5,
    },
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "₹0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "Up to 50 transactions/month",
        "Basic analytics",
        "3 budget categories",
        "Mobile app access",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "₹199",
      period: "per month",
      description: "For serious savers",
      features: [
        "Unlimited transactions",
        "Advanced analytics & reports",
        "Unlimited budget categories",
        "Bank sync integration",
        "Export to Excel/PDF",
        "Priority support",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Family",
      price: "₹399",
      period: "per month",
      description: "For the whole family",
      features: [
        "Everything in Pro",
        "Up to 5 family members",
        "Shared budgets & goals",
        "Family spending insights",
        "Dedicated account manager",
      ],
      cta: "Start Free Trial",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 lg:pt-40 pb-20 lg:pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-8 animate-fade-up">
              <Zap className="w-4 h-4 text-foreground" />
              <span className="text-sm font-medium text-foreground">Track Every Rupee, Effortlessly</span>
            </div>

            {/* Heading */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground leading-tight mb-6 animate-fade-up stagger-1">
              Your Money,{" "}
              <span className="relative">
                Your Rules
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 10C50 4 150 2 298 10" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" opacity="0.3"/>
                </svg>
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-up stagger-2">
              Take control of your finances with Aapka Khata. Smart expense tracking, 
              beautiful insights, and powerful budgeting tools—all in one place.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up stagger-3">
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 shadow-medium hover:shadow-elevated transition-all duration-300 px-8 py-6 text-base font-semibold"
              >
                Start Tracking Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto border-border hover:bg-secondary px-8 py-6 text-base"
              >
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 pt-12 border-t border-border/50 animate-fade-up stagger-4">
              <p className="text-sm text-muted-foreground mb-6">Trusted by 50,000+ users across India</p>
              <div className="flex flex-wrap items-center justify-center gap-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <stat.icon className="w-4 h-4 text-muted-foreground" />
                      <span className="font-display font-bold text-2xl text-foreground">{stat.value}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-20 relative max-w-5xl mx-auto animate-fade-up stagger-5">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background z-10 pointer-events-none" />
            <div className="bg-card rounded-2xl shadow-elevated border border-border overflow-hidden">
              <div className="bg-secondary/50 px-6 py-4 flex items-center gap-2 border-b border-border">
                <div className="w-3 h-3 rounded-full bg-destructive/50" />
                <div className="w-3 h-3 rounded-full bg-chart-3/50" />
                <div className="w-3 h-3 rounded-full bg-chart-1/50" />
              </div>
              <div className="p-6 lg:p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Balance Card */}
                  <Card className="bg-primary text-primary-foreground border-0">
                    <CardContent className="p-6">
                      <p className="text-primary-foreground/70 text-sm mb-1">Total Balance</p>
                      <p className="font-display font-bold text-3xl">₹1,24,500</p>
                      <div className="flex items-center gap-1 mt-2 text-sm">
                        <TrendingUp className="w-4 h-4" />
                        <span>+12.5% this month</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Income Card */}
                  <Card className="bg-card border-border">
                    <CardContent className="p-6">
                      <p className="text-muted-foreground text-sm mb-1">Income</p>
                      <p className="font-display font-bold text-3xl text-chart-1">₹85,000</p>
                      <div className="w-full h-2 bg-secondary rounded-full mt-3">
                        <div className="w-3/4 h-full bg-chart-1 rounded-full" />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Expenses Card */}
                  <Card className="bg-card border-border">
                    <CardContent className="p-6">
                      <p className="text-muted-foreground text-sm mb-1">Expenses</p>
                      <p className="font-display font-bold text-3xl text-chart-2">₹42,300</p>
                      <div className="w-full h-2 bg-secondary rounded-full mt-3">
                        <div className="w-1/2 h-full bg-chart-2 rounded-full" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-32 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border mb-6">
              <Target className="w-4 h-4 text-foreground" />
              <span className="text-sm font-medium text-foreground">Powerful Features</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Everything You Need to Master Your Money
            </h2>
            <p className="text-lg text-muted-foreground">
              From simple expense tracking to advanced analytics, we've got you covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <Card 
                key={feature.title} 
                className="bg-card border-border hover-lift group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 lg:p-8">
                  <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-display font-semibold text-xl text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-6">
              <Clock className="w-4 h-4 text-foreground" />
              <span className="text-sm font-medium text-foreground">Simple Process</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Get Started in 3 Easy Steps
            </h2>
            <p className="text-lg text-muted-foreground">
              Start tracking your expenses in under a minute. No complicated setup required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.step} className="relative text-center group">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-border" />
                )}
                
                <div className="relative z-10 inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-secondary border-2 border-border group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 mb-6">
                  <span className="font-display font-bold text-3xl">{step.step}</span>
                </div>
                <h3 className="font-display font-semibold text-xl text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 lg:py-32 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border mb-6">
              <Wallet className="w-4 h-4 text-foreground" />
              <span className="text-sm font-medium text-foreground">Simple Pricing</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Choose Your Plan
            </h2>
            <p className="text-lg text-muted-foreground">
              Start free and upgrade as you grow. No hidden fees, cancel anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan) => (
              <Card 
                key={plan.name} 
                className={`relative bg-card border-border hover-lift ${
                  plan.popular ? 'border-primary border-2 shadow-elevated' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <CardContent className="p-6 lg:p-8">
                  <div className="text-center mb-8">
                    <h3 className="font-display font-semibold text-xl text-foreground mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="font-display font-bold text-4xl text-foreground">{plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-chart-1/10 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-chart-1" />
                        </div>
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-6">
              <Star className="w-4 h-4 text-foreground" />
              <span className="text-sm font-medium text-foreground">Testimonials</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Loved by Thousands
            </h2>
            <p className="text-lg text-muted-foreground">
              See what our users have to say about their experience with Aapka Khata.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="bg-card border-border hover-lift">
                <CardContent className="p-6 lg:p-8">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-chart-3 text-chart-3" />
                    ))}
                  </div>
                  <p className="text-foreground mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-semibold text-foreground">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Take Control of Your Finances?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-10">
              Join 50,000+ users who are already saving smarter with Aapka Khata. 
              Start your free trial today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 py-6 text-base font-semibold"
              >
                Get Started for Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="outline-on-primary w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground px-8 py-6 text-base"
              >
                Talk to Sales
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
