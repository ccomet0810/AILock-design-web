import { colors, layout, mascot, motion, radii, spacing, typography } from "../design/tokens";
import { BrandMark, DesignIcon, iconNames } from "../design/icons";
import { Section, SpecTable } from "../components/ailock";

const colorGroups = [
  {
    title: "Core surfaces",
    items: [
      ["AppBackground", colors.appBackground],
      ["AppSurface", colors.appSurface],
      ["AppSurfaceMuted", colors.appSurfaceMuted],
      ["AppSurfacePressed", colors.appSurfacePressed],
    ],
  },
  {
    title: "Text and borders",
    items: [
      ["AppTextStrong", colors.appTextStrong],
      ["AppText", colors.appText],
      ["AppTextMuted", colors.appTextMuted],
      ["AppTextSubtle", colors.appTextSubtle],
      ["AppBorder", colors.appBorder],
      ["AppBorderStrong", colors.appBorderStrong],
    ],
  },
  {
    title: "Brand and state",
    items: [
      ["BrandOrangeHot", colors.brandOrangeHot],
      ["BrandOrange", colors.brandOrange],
      ["BrandOrangeDark", colors.brandOrangeDark],
      ["BrandCream", colors.brandCream],
      ["BrandBrown", colors.brandBrown],
      ["LeafGreen", colors.leafGreen],
      ["SoftRed", colors.softRed],
      ["SoftRedContainer", colors.softRedContainer],
      ["SoftGreenContainer", colors.softGreenContainer],
    ],
  },
  {
    title: "Glass material",
    items: [
      ["GlassSurface", colors.glassSurface],
      ["GlassSurfaceStrong", colors.glassSurfaceStrong],
      ["GlassBorder", colors.glassBorder],
    ],
  },
] as const;

export function FoundationsPage() {
  return (
    <div className="page-grid">
      <Section title="Color Tokens" note="당근 오렌지와 잎 그린을 중심으로 보호/제지 느낌을 재정의">
        <div className="color-grid">
          {colorGroups.map((group) => (
            <div className="token-panel" key={group.title}>
              <h3>{group.title}</h3>
              <div className="swatch-list">
                {group.items.map(([name, value]) => {
                  return (
                    <div className="swatch-row" key={name}>
                      <span className="swatch" style={{ backgroundColor: value }} />
                      <span>{name}</span>
                      <code>{value}</code>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Typography" note="큰 제목은 전환용, 컴포넌트 내부 텍스트를 분리해서 작업하는 중">
        <div className="type-list">
          {typography.map((item) => (
            <div className="type-row" key={item.token}>
              <div>
                <strong
                  style={{
                    fontSize: item.size,
                    lineHeight: `${item.line}px`,
                    fontWeight: item.weight,
                  }}
                >
                  앱 사용을 조금 더 명확하게
                </strong>
                <span>{item.token}</span>
              </div>
              <code>
                {item.size}/{item.line} · {item.weight}
              </code>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Spacing and Layout">
        <div className="two-column">
          <SpecTable
            rows={[
              { label: "Preview frame", value: `${layout.androidFrameWidth}px`, detail: "모바일 컴포넌트 검수용 화면 폭" },
              { label: "Screen horizontal", value: `${spacing.screenHorizontal}px` },
              { label: "Content rail", value: `${layout.contentWidth}px`, detail: "393px 프레임 안에서 좌우 20px을 둔 조립 기준" },
              { label: "Section gap", value: `${spacing.sectionGap}px` },
              { label: "Screen section gap", value: `${spacing.screenSectionGap}px`, detail: "섹션과 섹션 사이의 기본 간격" },
              { label: "Section label gap", value: `${spacing.sectionLabelGap}px`, detail: "섹션 라벨과 섹션 내용 사이의 기본 간격" },
              { label: "List gap", value: `${spacing.listGap}px` },
              { label: "Item padding", value: `${spacing.itemPadding}px` },
              { label: "Icon/text gap", value: `${spacing.iconTextGap}px` },
              { label: "Button height", value: `${layout.buttonHeight}px` },
              { label: "Bottom nav height", value: `${layout.bottomNavHeight}px` },
            ]}
          />
        </div>
      </Section>

      <Section title="Shape and Stroke" note="radius, border, control sizing처럼 모든 컴포넌트가 공유하는 형태 규칙">
        <div className="two-column">
          <SpecTable
            rows={[
              { label: "Card radius", value: `${radii.card}px` },
              { label: "List radius", value: `${radii.list}px` },
              { label: "Graph card radius", value: `${radii.graphCard}px` },
              { label: "Control radius", value: "pill" },
              { label: "Time wheel radius", value: `${radii.wheel}px` },
              { label: "Graph bar radius", value: "pill" },
              { label: "Chat anchor corner", value: `${radii.chatBubbleAnchor}px`, detail: "말하는 방향의 아래 모서리" },
              { label: "Default border", value: "1px" },
            ]}
          />
          <SpecTable
            rows={[
              { label: "App icon", value: `${layout.appIconSize}px` },
              { label: "Nav icon", value: `${layout.navIconSize}px` },
              { label: "Chat avatar", value: `${layout.chatAvatarSize}px` },
              { label: "Chat bubble one-line", value: `${layout.chatBubbleSingleLineHeight}px` },
              { label: "Chat message max", value: `${layout.chatMessageMaxWidth}px` },
              { label: "Mascot lg visual", value: `${mascot.visualLg}px` },
              { label: "Mascot hero visual", value: `${mascot.visualHero}px` },
              { label: "Fast motion", value: `${motion.fastMs}ms` },
              { label: "Chat motion", value: `${motion.chatMs}ms` },
              { label: "Permission icon", value: "38px" },
              { label: "Segment", value: "48 x 32px" },
            ]}
          />
        </div>
      </Section>

      <Section title="Brand Mark" note="원형 브랜드 마크의 기본 자산과 앱 안에서 쓰이는 상태 기준">
        <div className="brand-orb-foundation">
          <div className="brand-orb-state">
            <BrandMark className="foundation-brand-orb" />
            <strong>Default</strong>
            <span>기본 표시</span>
          </div>
          <div className="brand-orb-state thinking">
            <BrandMark className="foundation-brand-orb" />
            <strong>Thinking</strong>
            <span>판단 중</span>
          </div>
          <div className="brand-orb-state success">
            <BrandMark className="foundation-brand-orb" />
            <strong>Resolved</strong>
            <span>결과 표시</span>
          </div>
          <div className="brand-orb-state compact">
            <BrandMark className="foundation-brand-orb" />
            <strong>Compact</strong>
            <span>작은 배치</span>
          </div>
        </div>
      </Section>

      <Section title="Iconography" note="아이콘 자산과 규칙은 Foundation에 두고, 실제 사용 형태는 Components에서 검수">
        <div className="iconography-panel">
          <div className="icon-spec">
            {iconNames.map((name) => (
              <span className="icon-spec-item" key={name}>
                <DesignIcon name={name} size={24} />
                <small>{name}</small>
              </span>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
