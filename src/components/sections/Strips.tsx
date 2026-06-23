"use client";
import { useRef } from "react";
import { stats, techStrip } from "@/lib/data";

export function TechStrip() {
  return (
    <div className="flex items-center px-12 py-3 border-b border-gray-600 overflow-hidden">
      {techStrip.map((tech, i) => (
        <span key={tech} className="flex items-center">
          <span className="text-[11px] text-gray-200 uppercase tracking-[0.5px] whitespace-nowrap mr-8">
            {tech}
          </span>
          {i < techStrip.length - 1 && (
            <span className="text-gray-600 mr-8 text-[11px]">·</span>
          )}
        </span>
      ))}
    </div>
  );
}

export function Stats() {
  return (
    <div className="grid grid-cols-3">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={`px-12 py-8 ${i < stats.length - 1 ? "border-r border-gray-600" : ""}`}
        >
          <div className="text-[36px] font-light tracking-tightest text-white mb-1">
            {stat.number}
          </div>
          <div className="text-[12px] text-gray-200">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
