# VietQR Generator - Design Brainstorm

## Design Approach Selected: Modern Fintech Minimalism

### Design Philosophy
A clean, professional interface that reflects the financial nature of the application while maintaining approachability. The design prioritizes clarity, trust, and efficiency—users need to quickly input bank details and generate QR codes without friction.

### Core Principles
1. **Trust through Clarity**: Minimal visual noise, clear hierarchy, transparent data flow
2. **Efficiency First**: Direct path from input to QR generation, no unnecessary steps
3. **Professional Polish**: Subtle depth, refined typography, consistent micro-interactions
4. **Accessibility**: High contrast, clear labels, keyboard navigation support

### Color Philosophy
- **Primary**: Deep blue (#0066CC) - Trust, financial stability, professionalism
- **Accent**: Emerald green (#10B981) - Success, completion, money/growth
- **Background**: Off-white/Light gray (#F9FAFB) - Clean, professional, reduces eye strain
- **Text**: Dark slate (#1F2937) - High readability, professional tone
- **Error/Warning**: Coral red (#EF4444) - Clear but not aggressive

**Emotional Intent**: The palette conveys security and professionalism while the green accents provide positive feedback when users successfully generate QR codes.

### Layout Paradigm
- **Two-Column Asymmetric Layout**: Left side for form inputs (60%), right side for QR preview (40%)
- **Mobile**: Stack vertically with form on top, QR preview below
- **Breathing Room**: Generous padding, clear section separation
- **Card-based Organization**: Form fields grouped in subtle cards with soft shadows

### Signature Elements
1. **QR Preview Card**: Elevated, centered, with subtle animation on generation
2. **Bank Selection Dropdown**: Custom styling with bank logos and colors
3. **Success State**: Animated checkmark, copy-to-clipboard button with visual feedback

### Interaction Philosophy
- **Immediate Feedback**: Form validation shows as user types
- **Smooth Transitions**: 200-300ms transitions on state changes
- **Hover States**: Subtle color shifts, slight elevation on interactive elements
- **Loading State**: Animated spinner during QR generation

### Animation Guidelines
- **Form Inputs**: Gentle focus ring expansion (200ms)
- **QR Generation**: Fade-in with slight scale-up (300ms)
- **Copy Button**: Brief color flash on success
- **Errors**: Shake animation on validation failure (200ms)

### Typography System
- **Display Font**: "Poppins" (bold, 600-700 weight) for headers - modern, friendly
- **Body Font**: "Inter" (regular, 400-500 weight) for form labels and descriptions - clean, readable
- **Monospace**: "JetBrains Mono" for account numbers and technical info - technical precision

**Hierarchy**:
- Page Title: Poppins 32px, 700 weight
- Section Headers: Poppins 18px, 600 weight
- Form Labels: Inter 14px, 600 weight
- Body Text: Inter 14px, 400 weight
- Helper Text: Inter 12px, 400 weight, muted color

### Visual Distinctions
- Form inputs have subtle bottom borders instead of full boxes
- QR code preview has a soft shadow and rounded corners
- Bank logos are displayed inline with bank names
- Success states use green accent with icon confirmation
