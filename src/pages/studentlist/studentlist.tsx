
import {PlusCircleIcon } from "lucide-react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import BasicTableOne from "../../components/studentlist/studentlist";
import { useState } from "react";
import { Link } from "react-router";
import { Dropdown } from "../../components/ui/dropdown/Dropdown";
import { DropdownItem } from "../../components/ui/dropdown/DropdownItem";

export default function Studentlist() {
  return (
    <>
      <PageMeta
        title="Nystai Institute | CCTV & Home Automation Course Training"
        description="Join Nystai Institute to master CCTV installation and home automation systems. Get hands-on training, expert guidance, and industry-ready skills for a successful tech career."
      />
      <PageBreadcrumb pageTitle="Student Course Details" />

      <BasicTableOne />
    </>
  );
}




