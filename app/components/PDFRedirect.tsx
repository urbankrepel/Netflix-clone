"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const PDFRedirect = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const success = searchParams.get("success");
  const pdfLink = searchParams.get("pdfLink");

  useEffect(() => {
    if (success === "true" && pdfLink) {
      window.open(pdfLink, "_blank");
    }
    return () => {
      router.push("/home");
    };
  }, [success, pdfLink]);
  return <></>;
};

export default PDFRedirect;
