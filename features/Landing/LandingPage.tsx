'use client';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useTheme } from '@/lib/theme/use-theme';
import { 
  RocketOutlined, 
  CheckCircleOutlined, 
  StarOutlined, 
  TeamOutlined,
  BarChartOutlined,
  SecurityScanOutlined,
  ThunderboltOutlined,
  ArrowRightOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';

export function LandingPage() {
  const { tokens } = useTheme();

  const features = [
    {
      icon: <ThunderboltOutlined />,
      title: 'Fast Performance',
      description: 'Lightning-fast response times with optimized architecture',
    },
    {
      icon: <SecurityScanOutlined />,
      title: 'Enterprise Security',
      description: 'Bank-level encryption and compliance certifications',
    },
    {
      icon: <BarChartOutlined />,
      title: 'Advanced Analytics',
      description: 'Real-time insights and comprehensive reporting tools',
    },
    {
      icon: <TeamOutlined />,
      title: 'Team Collaboration',
      description: 'Seamless teamwork with built-in collaboration features',
    },
    {
      icon: <RocketOutlined />,
      title: 'Scalable Infrastructure',
      description: 'Grow without limits with our cloud-native platform',
    },
    {
      icon: <CheckCircleOutlined />,
      title: '24/7 Support',
      description: 'Dedicated support team available around the clock',
    },
  ];

  const pricing = [
    {
      name: 'Starter',
      price: '$29',
      period: '/month',
      features: [
        'Up to 5 users',
        '10GB storage',
        'Basic analytics',
        'Email support',
        'Community access',
      ],
      popular: false,
    },
    {
      name: 'Professional',
      price: '$79',
      period: '/month',
      features: [
        'Up to 20 users',
        '100GB storage',
        'Advanced analytics',
        'Priority support',
        'API access',
        'Custom integrations',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: '$199',
      period: '/month',
      features: [
        'Unlimited users',
        'Unlimited storage',
        'Enterprise analytics',
        'Dedicated support',
        'Custom development',
        'SLA guarantee',
      ],
      popular: false,
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechCorp',
      content: 'This platform transformed our operations. We saw a 40% increase in productivity within the first month.',
      avatar: 'SJ',
    },
    {
      name: 'Michael Chen',
      role: 'CTO, InnovateLab',
      content: 'The scalability and security features are unmatched. It\'s the perfect solution for growing businesses.',
      avatar: 'MC',
    },
    {
      name: 'Emily Davis',
      role: 'Manager, StartupX',
      content: 'Excellent support team and intuitive interface. Our team adapted to it in just days.',
      avatar: 'ED',
    },
  ];

  return (
    <div style={{ backgroundColor: tokens.background }}>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: tokens.primary + '15' }}>
            <StarOutlined style={{ color: tokens.primary }} />
            <span style={{ color: tokens.primary, fontSize: '0.875rem', fontWeight: '500' }}>
              Trusted by 10,000+ businesses worldwide
            </span>
          </div>
          
          <h1 
            className="text-5xl md:text-7xl font-bold leading-tight"
            style={{ color: tokens.text }}
          >
            Transform Your Business
            <br />
            <span style={{ color: tokens.primary }}>With Smart Solutions</span>
          </h1>
          
          <p 
            className="text-xl max-w-2xl mx-auto"
            style={{ color: tokens.textSecondary }}
          >
            Streamline operations, boost productivity, and drive growth with our comprehensive ERP platform designed for modern businesses.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="primary" size="lg" className="px-8 py-4 text-lg">
              Get Started Free <ArrowRightOutlined />
            </Button>
            <Button variant="secondary" size="lg" className="px-8 py-4 text-lg">
              <PlayCircleOutlined /> Watch Demo
            </Button>
          </div>

          <div className="flex justify-center gap-8 pt-8">
            {['Google', 'Microsoft', 'Amazon', 'Meta'].map((company) => (
              <span 
                key={company}
                className="text-2xl font-bold"
                style={{ color: tokens.textSecondary, opacity: 0.5 }}
              >
                {company}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl font-bold mb-4"
              style={{ color: tokens.text }}
            >
              Everything You Need to Succeed
            </h2>
            <p 
              className="text-lg max-w-2xl mx-auto"
              style={{ color: tokens.textSecondary }}
            >
              Powerful features designed to help you manage and grow your business efficiently
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:scale-105 transition-transform">
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: tokens.primary + '15', color: tokens.primary }}
                >
                  {feature.icon}
                </div>
                <h3 
                  className="text-xl font-semibold mb-2"
                  style={{ color: tokens.text }}
                >
                  {feature.title}
                </h3>
                <p style={{ color: tokens.textSecondary }}>
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4" style={{ backgroundColor: tokens.surface }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl font-bold mb-4"
              style={{ color: tokens.text }}
            >
              Simple, Transparent Pricing
            </h2>
            <p 
              className="text-lg max-w-2xl mx-auto"
              style={{ color: tokens.textSecondary }}
            >
              Choose the perfect plan for your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricing.map((plan, index) => (
              <div 
                key={index}
                className={`relative p-8 rounded-2xl ${plan.popular ? 'ring-2' : ''}`}
                style={{ 
                  backgroundColor: tokens.background,
                  borderColor: plan.popular ? tokens.primary : 'transparent',
                  boxShadow: plan.popular ? `0 0 0 4px ${tokens.primary + '20'}` : 'none'
                }}
              >
                {plan.popular && (
                  <div 
                    className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-sm font-semibold"
                    style={{ backgroundColor: tokens.primary, color: 'white' }}
                  >
                    Most Popular
                  </div>
                )}
                
                <h3 
                  className="text-2xl font-bold mb-2"
                  style={{ color: tokens.text }}
                >
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span 
                    className="text-4xl font-bold"
                    style={{ color: tokens.primary }}
                  >
                    {plan.price}
                  </span>
                  <span style={{ color: tokens.textSecondary }}>
                    {plan.period}
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircleOutlined style={{ color: tokens.success }} />
                      <span style={{ color: tokens.textSecondary }}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  variant={plan.popular ? 'primary' : 'secondary'} 
                  className="w-full"
                >
                  {plan.popular ? 'Get Started' : 'Contact Sales'}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl font-bold mb-4"
              style={{ color: tokens.text }}
            >
              Loved by Businesses Worldwide
            </h2>
            <p 
              className="text-lg max-w-2xl mx-auto"
              style={{ color: tokens.textSecondary }}
            >
              See what our customers have to say about their experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarOutlined key={star} style={{ color: tokens.warning, fontSize: '1rem' }} />
                  ))}
                </div>
                <p 
                  className="mb-6 italic"
                  style={{ color: tokens.textSecondary }}
                >
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center font-semibold"
                    style={{ backgroundColor: tokens.primary, color: 'white' }}
                  >
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p 
                      className="font-semibold"
                      style={{ color: tokens.text }}
                    >
                      {testimonial.name}
                    </p>
                    <p 
                      className="text-sm"
                      style={{ color: tokens.textSecondary }}
                    >
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="p-12">
            <h2 
              className="text-4xl font-bold mb-4"
              style={{ color: tokens.text }}
            >
              Ready to Transform Your Business?
            </h2>
            <p 
              className="text-lg mb-8 max-w-2xl mx-auto"
              style={{ color: tokens.textSecondary }}
            >
              Join thousands of businesses already using our platform to streamline their operations and drive growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" className="px-8 py-4 text-lg">
                Start Free Trial <ArrowRightOutlined />
              </Button>
              <Button variant="secondary" size="lg" className="px-8 py-4 text-lg">
                Schedule Demo
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4" style={{ backgroundColor: tokens.surface }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 
                className="text-xl font-bold mb-4"
                style={{ color: tokens.primary }}
              >
                ERP Platform
              </h3>
              <p style={{ color: tokens.textSecondary }}>
                Transform your business with our comprehensive ERP solution.
              </p>
            </div>
            <div>
              <h4 
                className="font-semibold mb-4"
                style={{ color: tokens.text }}
              >
                Product
              </h4>
              <ul className="space-y-2" style={{ color: tokens.textSecondary }}>
                <li>Features</li>
                <li>Pricing</li>
                <li>Integrations</li>
                <li>API</li>
              </ul>
            </div>
            <div>
              <h4 
                className="font-semibold mb-4"
                style={{ color: tokens.text }}
              >
                Company
              </h4>
              <ul className="space-y-2" style={{ color: tokens.textSecondary }}>
                <li>About</li>
                <li>Careers</li>
                <li>Blog</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 
                className="font-semibold mb-4"
                style={{ color: tokens.text }}
              >
                Support
              </h4>
              <ul className="space-y-2" style={{ color: tokens.textSecondary }}>
                <li>Help Center</li>
                <li>Documentation</li>
                <li>Status</li>
                <li>Security</li>
              </ul>
            </div>
          </div>
          <div 
            className="pt-8 text-center"
            style={{ borderTop: `1px solid ${tokens.border}` }}
          >
            <p style={{ color: tokens.textSecondary }}>
              © 2024 ERP Platform. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
