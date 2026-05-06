"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

interface ProfileSidebarEnhancedProps {
  brandName: string;
  logoUrl?: string;
  fallbackText: string;
  profileUrl: string;
}

export function ProfileSidebarEnhanced({ 
  brandName, 
  logoUrl, 
  fallbackText,
  profileUrl 
}: ProfileSidebarEnhancedProps) {

  const handleFollow = () => {
    // Redirect to login page
    window.location.href = "/login";
  };

  return (
    <>
      <div className="rounded-2xl border border-border/60 bg-white/90 p-6 shadow-sm">
        {/* Profile Avatar */}
        <div className="flex justify-center mb-6">
          <div className="relative h-24 w-24 overflow-hidden rounded-full border border-border/70 bg-muted">
            {logoUrl ? (
              <img 
                src={logoUrl} 
                alt={brandName} 
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-muted-foreground">
                {fallbackText}
              </div>
            )}
          </div>
        </div>
        
        {/* Branding */}
        <div className="text-center mb-6">
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">MONO BLANKS</h2>
          <p className="text-lg font-semibold text-foreground">{brandName}</p>
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full justify-center"
            onClick={handleFollow}
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Follow
          </Button>
        </div>
      </div>

    </>
  );
}
