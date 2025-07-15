import React from "react";
import { 
  Award, 
  Shield, 
  Users, 
  MapPin, 
  Calendar, 
  Star,
  Target,
  Heart,
  Compass,
  Mountain,
  Trophy,
  CheckCircle,
  Quote
} from "lucide-react";

const AboutPage = () => {
  const stats = [
    {
      icon: Users,
      value: "50,000+",
      label: "Happy Adventurers",
      description: "Thrilled customers worldwide"
    },
    {
      icon: Calendar,
      value: "10+",
      label: "Years Experience",
      description: "Decade of adventure excellence"
    },
    {
      icon: Award,
      value: "25+",
      label: "Safety Awards",
      description: "Industry recognition"
    },
    {
      icon: MapPin,
      value: "100+",
      label: "Adventure Locations",
      description: "Across 15 countries"
    }
  ];

  const values = [
    {
      icon: Shield,
      title: "Safety First",
      description: "Your safety is our top priority. We maintain the highest safety standards with certified equipment and expert guides."
    },
    {
      icon: Heart,
      title: "Passion for Adventure",
      description: "We live and breathe adventure. Our team is passionate about creating unforgettable experiences that push boundaries."
    },
    {
      icon: Users,
      title: "Community Focus",
      description: "Building a community of thrill-seekers who share our love for adventure and respect for nature."
    },
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for excellence in every aspect of our service, from booking to the final adventure moment."
    }
  ];

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "https://api.dicebear.com/8.x/lorelei/svg?seed=sarah",
      bio: "Adventure enthusiast with 15 years of experience in extreme sports and tourism."
    },
    {
      name: "Mike Chen",
      role: "Head of Safety",
      image: "https://api.dicebear.com/8.x/lorelei/svg?seed=mike",
      bio: "Former rescue specialist with expertise in risk management and safety protocols."
    },
    {
      name: "Emma Rodriguez",
      role: "Lead Guide",
      image: "https://api.dicebear.com/8.x/lorelei/svg?seed=emma",
      bio: "Professional mountaineer and certified guide with over 1000 successful adventures."
    },
    {
      name: "David Park",
      role: "Operations Manager",
      image: "https://api.dicebear.com/8.x/lorelei/svg?seed=david",
      bio: "Logistics expert ensuring smooth operations and exceptional customer experiences."
    }
  ];

  const achievements = [
    {
      icon: Trophy,
      title: "Industry Leader",
      description: "Recognized as the leading adventure tourism company in the region"
    },
    {
      icon: Star,
      title: "5-Star Rating",
      description: "Maintaining a 4.9/5 star rating across all platforms"
    },
    {
      icon: Shield,
      title: "Zero Incidents",
      description: "Perfect safety record over 10 years of operations"
    },
    {
      icon: Award,
      title: "Certified Excellence",
      description: "Multiple certifications from international adventure tourism boards"
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-teal-600 via-teal-700 to-purple-700 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About Thrill Quest
            </h1>
            <p className="text-xl md:text-2xl text-teal-100 max-w-3xl mx-auto leading-relaxed">
              We're passionate adventurers dedicated to creating unforgettable experiences that push boundaries and create lasting memories.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 text-center border border-slate-200">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-teal-50 to-purple-50 rounded-lg mb-4">
                <stat.icon className="w-6 h-6 text-teal-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</div>
              <div className="text-slate-700 font-medium mb-1">{stat.label}</div>
              <div className="text-sm text-slate-500">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Our Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Founded in 2014, Thrill Quest began as a small group of adventure enthusiasts who wanted to share their passion for extreme experiences with the world. What started as weekend trips for friends has grown into a globally recognized adventure tourism company.
              </p>
              <p>
                Our journey has taken us from local mountain trails to international destinations, always with one goal in mind: to provide safe, thrilling, and transformative experiences that create lifelong memories and push personal boundaries.
              </p>
              <p>
                Today, we're proud to be the leading adventure tourism company in the region, with a perfect safety record and thousands of satisfied adventurers who have discovered their limits and surpassed them with us.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-teal-50 to-purple-50 rounded-2xl p-8 border border-teal-100">
              <div className="flex items-center gap-3 mb-6">
                <Mountain className="w-8 h-8 text-teal-600" />
                <h3 className="text-xl font-bold text-slate-900">Our Mission</h3>
              </div>
              <p className="text-slate-700 leading-relaxed mb-6">
                To inspire and enable people to discover their potential through safe, thrilling adventures that connect them with nature and themselves.
              </p>
              <div className="flex items-center gap-3">
                <Compass className="w-8 h-8 text-purple-600" />
                <h3 className="text-xl font-bold text-slate-900">Our Vision</h3>
              </div>
              <p className="text-slate-700 leading-relaxed mt-4">
                To be the world's most trusted adventure tourism company, setting the standard for safety, excellence, and transformative experiences.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              These principles guide everything we do and shape every adventure we create.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-teal-50 to-purple-50 rounded-2xl mb-4">
                  <value.icon className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Experienced professionals dedicated to making your adventure dreams come true.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-48 object-cover bg-gradient-to-br from-teal-50 to-purple-50"
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{member.name}</h3>
                  <p className="text-teal-600 font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-slate-600 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Achievements</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Recognition and milestones that reflect our commitment to excellence.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-teal-600 to-purple-600 rounded-2xl mb-4">
                  <achievement.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{achievement.title}</h3>
                <p className="text-slate-600 leading-relaxed">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="bg-gradient-to-r from-teal-600 to-purple-600 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Quote className="w-12 h-12 text-white/60 mx-auto mb-8" />
          <blockquote className="text-2xl md:text-3xl font-medium text-white leading-relaxed mb-8">
            "Thrill Quest doesn't just provide adventures - they create life-changing experiences. The professionalism, safety standards, and pure passion of their team is unmatched."
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <img
              src="https://api.dicebear.com/8.x/lorelei/svg?seed=testimonial"
              alt="Customer"
              className="w-12 h-12 rounded-full ring-2 ring-white/30"
            />
            <div className="text-left">
              <p className="text-white font-semibold">Alex Thompson</p>
              <p className="text-teal-100 text-sm">Adventure Enthusiast</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Join thousands of adventurers who have discovered their limits and pushed beyond them with Thrill Quest.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-teal-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-teal-700 hover:to-purple-700 transition-all duration-200">
              Book Your Adventure
            </button>
            <button className="border-2 border-teal-600 text-teal-600 px-8 py-3 rounded-xl font-semibold hover:bg-teal-50 transition-all duration-200">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;