import React from "react";
import {
  CalendarDays,
  Mountain,
  UsersRound,
  UserCheck,
} from "lucide-react";

const cards = [
  {
    icon: Mountain,
    label: "Total Activities",
    value: 247,
    stat: "+15 new this month",
    color: "bg-blue-100",
  },
  {
    icon: CalendarDays,
    label: "Upcoming Bookings",
    value: 1284,
    stat: "+23% from last week",
    color: "bg-orange-100",
  },
  {
    icon: UserCheck,
    label: "Registered Guides",
    value: 156,
    stat: "+8 certified this month",
    color: "bg-green-100",
  },
  {
    icon: UsersRound,
    label: "Active Users",
    value: 8947,
    stat: "+31% growth rate",
    color: "bg-purple-100",
  },
];

const SummaryCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, idx) => (
        <div key={idx} className={`rounded-xl shadow-md p-4 ${card.color}`}>
          <div className="flex items-center justify-between">
            <card.icon className="w-6 h-6 text-gray-700" />
            <div className="text-right">
              <div className="text-2xl font-bold">{card.value}</div>
              <div className="text-sm text-gray-600">{card.label}</div>
            </div>
          </div>
          <div className="text-sm text-gray-500 mt-2">{card.stat}</div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;