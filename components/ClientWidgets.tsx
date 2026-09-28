"use client";
import dynamic from "next/dynamic";

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });
const AIAssistant = dynamic(() => import("@/components/AIAssistant"), { ssr: false });
const WhatsAppButton = dynamic(() => import("@/components/WhatsAppButton"), { ssr: false });

export default function ClientWidgets() {
  return (
    <>
      <CustomCursor />
      <AIAssistant />
      <WhatsAppButton />
    </>
  );
}
