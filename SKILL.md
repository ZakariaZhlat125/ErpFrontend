# Ant Design ERP Form / Button / Modal Design Skill

> This document is also suitable to save as `antd-form-modal-design-skill.md` in your project docs.

## Goal

Create a reusable UI design standard for **forms**, **buttons**, and **modals** that matches the uploaded ERP screenshots and fits the project's existing theme tokens from `globals.css`.

This guide is written for a stack that uses:

* **Ant Design** components
* **Tailwind CSS v4** utilities
* existing CSS variables from `globals.css`

---

## Design Direction

The visual style from the screenshots is:

* soft light admin dashboard aesthetic
* large rounded modal surfaces
* pale gradient modal header
* quiet gray form controls
* bold dark headings
* strong purple-to-blue primary action buttons
* subtle shadows and soft overlay blur
* spacious field layout with clear grouping

This style should feel polished, premium, and calm rather than sharp or overly contrast-heavy.

---

## Base Theme Fit

Use the existing theme variables from `globals.css` as the foundation.

### Existing tokens already available

* `--primary`
* `--primary-hover`
* `--primary-soft`
* `--secondary`
* `--success`
* `--warning`
* `--danger`
* `--info`
* `--background`
* `--surface`
* `--surface-muted`
* `--surface-hover`
* `--text`
* `--text-secondary`
* `--text-muted`
* `--border`
* `--border-strong`
* `--shadow-light`
* `--shadow-dark`
* `--focus-ring`

---

## Additional UI Tokens For This Modal Style

Add these tokens on top of the existing globals for the modal/form system.

```css
:root {
  --modal-overlay: rgba(15, 23, 42, 0.34);
  --modal-header-start: #f4effc;
  --modal-header-end: #edf4ff;

  --form-field-bg: #f3f4f6;
  --form-field-bg-hover: #eef2f7;
  --form-placeholder: #9aa3b2;
  --form-label: #475467;
  --form-value: #111827;

  --modal-radius: 24px;
  --field-radius: 14px;
  --button-radius: 14px;

  --modal-shadow: 0 20px 60px rgba(15, 23, 42, 0.18);
  --button-shadow: 0 10px 24px rgba(124, 58, 237, 0.24);
  --danger-shadow: 0 10px 24px rgba(230, 0, 122, 0.22);

  --action-gradient: linear-gradient(90deg, #a21caf 0%, #7c3aed 38%, #4f46e5 68%, #2563eb 100%);
  --danger-gradient: linear-gradient(90deg, #ff003d 0%, #e6007a 100%);
}

.dark {
  --modal-overlay: rgba(2, 6, 23, 0.60);
  --modal-header-start: #1a2032;
  --modal-header-end: #182338;

  --form-field-bg: #172131;
  --form-field-bg-hover: #1d2a3f;
  --form-placeholder: #7f8ba0;
  --form-label: #cbd5e1;
  --form-value: #f8fafc;

  --modal-shadow: 0 22px 70px rgba(0, 0, 0, 0.45);
}
```

---

## Modal Design Rules

### Structure

A modal should have 3 sections:

1. header
2. content/body
3. footer actions

### Modal Container

* background: `var(--surface)`
* border-radius: `var(--modal-radius)`
* box-shadow: `var(--modal-shadow)`
* overflow: hidden
* border: `1px solid color-mix(in srgb, var(--border) 70%, white 30%)`

### Modal Header

* height target: `76px` to `88px`
* horizontal padding: `24px` to `30px`
* background: `linear-gradient(90deg, var(--modal-header-start), var(--modal-header-end))`
* border-bottom: `1px solid var(--border)`
* title weight: `700`
* title size: `18px` to `22px`
* title color: `var(--text)`
* close button should be minimal and quiet

### Modal Body

* padding: `24px` on small screens, `28px` to `32px` on desktop
* background: `var(--surface)`
* section spacing: `20px` to `24px`

### Modal Overlay

* use a dark transparent overlay
* apply blur for a premium dashboard feel

Recommended overlay behavior:

```css
backdrop-filter: blur(6px);
background: var(--modal-overlay);
```

---

## Form Design Rules

### Labels

* font-size: `14px`
* font-weight: `600`
* color: `var(--form-label)`
* margin-bottom: `8px`
* required asterisk should remain visible but subtle

### Inputs / Selects / Textareas

Shared characteristics from the screenshots:

* soft filled background instead of strong border
* rounded corners
* very low visual noise
* clean focus ring

#### Standard control spec

* height: `48px`
* background: `var(--form-field-bg)`
* border: `1px solid transparent`
* border-radius: `var(--field-radius)`
* padding-inline: `16px`
* font-size: `15px` to `16px`
* color: `var(--form-value)`
* placeholder color: `var(--form-placeholder)`
* transition: `all 0.2s ease`

#### Hover state

* background: `var(--form-field-bg-hover)`

#### Focus state

* border-color: `var(--primary)`
* box-shadow: `0 0 0 4px var(--focus-ring)`
* background stays soft

### Textarea

* min-height: `104px` to `120px`
* padding-top: `14px`
* resize: vertical or none depending on page pattern

### Select

* arrow should remain visible and clean
* selected value aligned vertically to match input text
* dropdown should keep same rounding language as modal

### Validation

* keep errors clean and unobtrusive
* error color can reuse `--danger`
* avoid loud red fills
* use border + helper text only

---

## Layout Rules For Forms

### Grid Pattern

Use a responsive two-column layout for most business forms.

#### Recommended pattern

* `1 column` on mobile
* `2 columns` on tablet and desktop
* long fields span both columns

Examples of full-width fields:

* address
* description
* notes
* permissions areas

### Spacing

* row gap: `18px` to `22px`
* column gap: `16px` to `20px`
* footer top margin: `24px` to `28px`

### Alignment

* labels aligned consistently
* buttons always same height
* left action secondary, right action primary

---

## Button Design Rules

### Primary Button

Based on the screenshots, the main CTA style is the strongest visual brand element.

#### Spec

* height: `48px`
* border-radius: `var(--button-radius)`
* background: `var(--action-gradient)`
* text color: `#ffffff`
* font-weight: `700`
* border: `none`
* box-shadow: `var(--button-shadow)`

#### Hover

* slightly brighter
* optional `transform: translateY(-1px)`

#### Active

* reduce shadow slightly
* maintain gradient

### Secondary Button

The cancel button should be soft and quiet.

#### Spec

* height: `48px`
* border-radius: `var(--button-radius)`
* background: `#f3f4f6`
* text color: `#344054`
* border: `1px solid transparent` or `1px solid var(--border)`
* box-shadow: none

#### Hover

* background: `#eceff3`

### Danger Button

For destructive confirmations like delete.

#### Spec

* background: `var(--danger-gradient)`
* text color: `#ffffff`
* border: none
* box-shadow: `var(--danger-shadow)`
* use only in delete or irreversible actions

---

## Ant Design Mapping

Use Ant Design primitives, but override them to match the ERP style.

### Recommended components

* `Modal`
* `Form`
* `Input`
* `Input.TextArea`
* `Select`
* `Button`
* `Checkbox`
* `Radio`
* `Divider`

### AntD behavior guidance

* prefer `Form layout="vertical"`
* avoid default AntD sharp borders in these modals
* use `footer={null}` in `Modal` and render custom footer buttons inside body for full layout control
* use `destroyOnHidden` or controlled reset where forms should clear on close
* use `maskClosable={false}` for create/edit flows when accidental close would be harmful

---

## Ant Design Style Overrides

Use these overrides in a dedicated stylesheet or component-level class wrapper.

```css
.erp-modal .ant-modal-content {
  padding: 0;
  overflow: hidden;
  border-radius: var(--modal-radius);
  background: var(--surface);
  box-shadow: var(--modal-shadow);
}

.erp-modal .ant-modal-header {
  margin-bottom: 0;
  padding: 24px 28px;
  background: linear-gradient(90deg, var(--modal-header-start), var(--modal-header-end));
  border-bottom: 1px solid var(--border);
}

.erp-modal .ant-modal-title {
  color: var(--text);
  font-size: 20px;
  font-weight: 700;
}

.erp-modal .ant-modal-close {
  color: #98a2b3;
}

.erp-modal .ant-modal-body {
  padding: 28px;
}

.erp-form .ant-form-item {
  margin-bottom: 18px;
}

.erp-form .ant-form-item-label > label {
  color: var(--form-label);
  font-weight: 600;
  font-size: 14px;
}

.erp-form .ant-input,
.erp-form .ant-input-affix-wrapper,
.erp-form .ant-select-selector,
.erp-form .ant-input-number,
.erp-form .ant-picker {
  min-height: 48px;
  border-radius: var(--field-radius) !important;
  background: var(--form-field-bg) !important;
  border: 1px solid transparent !important;
  box-shadow: none !important;
}

.erp-form .ant-input,
.erp-form .ant-input-number-input,
.erp-form .ant-select-selection-item,
.erp-form .ant-select-selection-placeholder,
.erp-form textarea.ant-input {
  font-size: 15px;
}

.erp-form .ant-input::placeholder,
.erp-form textarea.ant-input::placeholder {
  color: var(--form-placeholder);
}

.erp-form .ant-input:hover,
.erp-form .ant-input-affix-wrapper:hover,
.erp-form .ant-select-selector:hover,
.erp-form textarea.ant-input:hover {
  background: var(--form-field-bg-hover) !important;
}

.erp-form .ant-input:focus,
.erp-form .ant-input-affix-wrapper-focused,
.erp-form .ant-select-focused .ant-select-selector,
.erp-form textarea.ant-input:focus {
  border-color: var(--primary) !important;
  box-shadow: 0 0 0 4px var(--focus-ring) !important;
  background: var(--form-field-bg) !important;
}

.erp-form textarea.ant-input {
  min-height: 110px;
  padding-top: 14px;
}

.erp-btn-primary.ant-btn {
  height: 48px;
  border: none;
  border-radius: var(--button-radius);
  color: white;
  font-weight: 700;
  background: var(--action-gradient);
  box-shadow: var(--button-shadow);
}

.erp-btn-primary.ant-btn:hover,
.erp-btn-primary.ant-btn:focus {
  color: white !important;
  background: var(--action-gradient) !important;
  filter: brightness(1.03);
}

.erp-btn-secondary.ant-btn {
  height: 48px;
  border-radius: var(--button-radius);
  background: #f3f4f6;
  color: #344054;
  border: 1px solid transparent;
  box-shadow: none;
}

.erp-btn-secondary.ant-btn:hover,
.erp-btn-secondary.ant-btn:focus {
  background: #eceff3 !important;
  color: #344054 !important;
}

.erp-btn-danger.ant-btn {
  height: 48px;
  border: none;
  border-radius: var(--button-radius);
  color: white;
  font-weight: 700;
  background: var(--danger-gradient);
  box-shadow: var(--danger-shadow);
}
```

---

## Recommended Modal Widths

Use consistent widths depending on content complexity.

* small confirm modal: `480px` to `560px`
* standard form modal: `720px` to `860px`
* complex settings modal: `920px` to `1040px`

Examples from the screenshots:

* delete confirmation: small
* add/edit forms: standard to large
* permission-heavy role modal: large

---

## Footer Action Pattern

Always use a 2-button footer layout.

### Pattern

* left: cancel / back / dismiss
* right: primary action

### Rules

* both buttons same height
* equal visual weight in width where appropriate
* primary action always strongest color
* destructive flow uses danger button on right

Recommended layout:

```tsx
<div className="mt-6 grid grid-cols-2 gap-4">
  <Button className="erp-btn-secondary">Cancel</Button>
  <Button type="primary" className="erp-btn-primary">Add Organization</Button>
</div>
```

---

## Delete Confirmation Pattern

For destructive confirmations:

* use smaller modal
* place warning icon inside a soft danger circle
* title concise and bold
* body text muted and readable
* right-side danger action

### Design notes

* icon container: circular, pink/red filled
* body copy should explain permanence clearly
* avoid overloading with extra controls

---

## Example AntD Modal Skeleton

```tsx
import { Button, Form, Input, Modal, Select } from 'antd';

export function OrganizationModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form] = Form.useForm();

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={900}
      className="erp-modal"
      centered
      destroyOnHidden
      maskClosable={false}
    >
      <Form form={form} layout="vertical" className="erp-form">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Form.Item label="Organization Name" name="name" required className="md:col-span-2">
            <Input placeholder="Enter organization name" />
          </Form.Item>

          <Form.Item label="Email" name="email" required>
            <Input placeholder="email@example.com" />
          </Form.Item>

          <Form.Item label="Phone" name="phone" required>
            <Input placeholder="+1 (555) 000-0000" />
          </Form.Item>

          <Form.Item label="Address" name="address" required className="md:col-span-2">
            <Input placeholder="Enter full address" />
          </Form.Item>

          <Form.Item label="Status" name="status" required className="md:col-span-2">
            <Select
              options={[
                { label: 'Active', value: 'active' },
                { label: 'Inactive', value: 'inactive' },
              ]}
            />
          </Form.Item>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <Button className="erp-btn-secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="primary" className="erp-btn-primary">
            Add Organization
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
```

---

## UX Rules To Keep Consistency

### Do

* keep label positions consistent
* use vertical forms inside modals
* keep modal padding generous
* use 48px control height for most business fields
* keep primary action wording verb-based: `Add User`, `Update Role`, `Delete`, `Save Changes`
* keep placeholders instructional and short
* keep destructive actions visually distinct

### Avoid

* mixing outlined and filled input styles in the same modal
* using too many button colors in one footer
* overly bright header gradients
* very strong borders on inputs
* tiny form spacing
* center-aligning form labels

---

## Suggested Reusable Naming Convention

### Classes

* `erp-modal`
* `erp-form`
* `erp-modal-header`
* `erp-modal-footer`
* `erp-btn-primary`
* `erp-btn-secondary`
* `erp-btn-danger`
* `erp-field-grid`

### Component wrappers

* `AppModal`
* `AppFormModal`
* `ConfirmDeleteModal`
* `FormActions`

---

## Final Design Summary

This ERP style should be implemented as:

* **Ant Design structure** for reliability and form behavior
* **Tailwind layout utilities** for grid and spacing
* **CSS variable theming** from `globals.css`
* **custom AntD overrides** for the polished modal/form appearance

The core identity is:

* soft surface
* rounded shapes
* muted fields
* strong gradient CTA
* spacious modal layout
* enterprise-friendly clarity

That combination will reproduce the uploaded screenshots closely while staying maintainable inside your current design system.
