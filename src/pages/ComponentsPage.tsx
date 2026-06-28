import type { ReactNode } from "react";
import {
  AccordionStateMatrix,
  AppSelectionRowStateMatrix,
  BottomNavigationStateMatrix,
  ButtonStateMatrix,
  ChatComponentsStateMatrix,
  GraphStateMatrix,
  HeaderStateMatrix,
  IconButtonStateMatrix,
  InputStateMatrix,
  MascotStateMatrix,
  OnboardingPatternStateMatrix,
  PermissionStateMatrix,
  DecisionResponseStateMatrix,
  ReasonChatFlowStateMatrix,
  Section,
  SectionLabelStateMatrix,
  SegmentedControlStateMatrix,
  SpeechBubbleStateMatrix,
  TimeWheelPickerStateMatrix,
  UsageRowStateMatrix,
} from "../components/ailock";

function CatalogGroup({
  index,
  title,
  description,
  children,
}: {
  index: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="catalog-group">
      <div className="catalog-group-heading">
        <span>{index}</span>
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
      <div className="catalog-group-body">{children}</div>
    </section>
  );
}

export function ComponentsPage() {
  return (
    <div className="component-layout">
      <div className="component-main component-catalog">
        <div className="catalog-map">
          <div>
            <span>Foundation</span>
            <strong>Spacing, section rhythm, brand primitives</strong>
          </div>
          <div>
            <span>Components</span>
            <strong>Reusable controls, rows, graphs, and navigation</strong>
          </div>
          <div>
            <span>Patterns</span>
            <strong>Composed screen-level flows built from components</strong>
          </div>
        </div>

        <CatalogGroup
          index="01"
          title="Layout & Sections"
          description="Screen spacing, section labels, and list rhythm used as the base structure for every screen."
        >
          <Section title="Section Labels" note="Labels and spacing rules above lists, graphs, and boxed content">
            <SectionLabelStateMatrix />
          </Section>
        </CatalogGroup>

        <CatalogGroup
          index="02"
          title="Brand Primitives"
          description="Small brand expression units. Speech Bubble and Mascot stay separate so screens can compose them intentionally."
        >
          <Section title="Speech Bubble" note="Animated speech text states">
            <SpeechBubbleStateMatrix />
          </Section>

          <Section title="Mascot" note="Mascot mood variants">
            <MascotStateMatrix />
          </Section>
        </CatalogGroup>

        <CatalogGroup index="03" title="Actions" description="Single-step controls such as confirm, next, close, and add actions.">
          <Section title="Button" note="General buttons and bottom CTA button states">
            <ButtonStateMatrix />
          </Section>

          <Section title="Icon Button" note="Contained, soft, quiet, dismiss icon-only actions">
            <IconButtonStateMatrix />
          </Section>
        </CatalogGroup>

        <CatalogGroup
          index="04"
          title="Inputs & Pickers"
          description="Controls for entering text, switching modes, and selecting time values."
        >
          <Section title="Search Field" note="App name search states and clear/search affordance">
            <InputStateMatrix />
          </Section>

          <Section title="Segmented Control" note="Mutually exclusive time unit selection">
            <SegmentedControlStateMatrix />
          </Section>

          <Section title="Time Wheel Picker" note="Hour and minute wheel control for limit setup">
            <TimeWheelPickerStateMatrix />
          </Section>
        </CatalogGroup>

        <CatalogGroup
          index="05"
          title="Rows & Lists"
          description="Reusable information rows for apps, permissions, usage history, and expandable list states."
        >
          <Section title="App Selection Row" note="Shared by AppPicker and onboarding app selection">
            <AppSelectionRowStateMatrix />
          </Section>

          <Section title="Accordion" note="Expandable row container used by lock app timer setup">
            <AccordionStateMatrix />
          </Section>

          <Section title="Usage Row" note="App name, time label, and horizontal usage graph">
            <UsageRowStateMatrix />
          </Section>

          <Section title="Permission Row" note="Missing, granted, and all-granted permission states">
            <PermissionStateMatrix />
          </Section>
        </CatalogGroup>

        <CatalogGroup
          index="06"
          title="Data Visualization"
          description="Graph components for comparing and reading daily or weekly usage time."
        >
          <Section title="Usage Graph" note="Daily and weekly usage graphs with fixed axis rules">
            <GraphStateMatrix />
          </Section>
        </CatalogGroup>

        <CatalogGroup
          index="07"
          title="Navigation & Chrome"
          description="Screen-level chrome for route changes, current location, headers, and bottom navigation."
        >
          <Section title="Floating Tab Bar" note="Route-based selected states and icon/text relationship">
            <BottomNavigationStateMatrix />
          </Section>

          <Section title="Collapsing Header" note="Large title to compact header transition">
            <HeaderStateMatrix />
          </Section>
        </CatalogGroup>

        <CatalogGroup
          index="08"
          title="Composed Screen Patterns"
          description="Composed patterns that combine primitives and controls into realistic screen flows."
        >
          <Section title="Chat Components" note="Message bubbles, chat input, and thinking state">
            <ChatComponentsStateMatrix />
          </Section>

          <Section title="Onboarding Layout" note="Header, progress, prompt, form area, and bottom action">
            <OnboardingPatternStateMatrix />
          </Section>

          <Section title="Reason Chat Flow" note="Interactive reason input, thinking, result, and retry states">
            <ReasonChatFlowStateMatrix />
          </Section>

          <Section title="Decision Response" note="Static allowed and denied response states built from chat components">
            <DecisionResponseStateMatrix />
          </Section>
        </CatalogGroup>
      </div>
    </div>
  );
}
