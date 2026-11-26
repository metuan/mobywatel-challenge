import { styled } from '@/lib/styled';

/*
 * Read-only label/value pairs inside a List: what the app already knows ("Adres: Kraków").
 *
 *   <List>
 *     <Field>
 *       <FieldLabel>Nowy adres</FieldLabel>
 *       <FieldValue>ul. Długa 5, Kraków</FieldValue>
 *       <FieldSource>PESEL</FieldSource>
 *     </Field>
 *   </List>
 */
export const Field = styled('field', 'div', 'px-4 py-[11px]');

export const FieldLabel = styled('field-label', 'div', 'text-[12.5px]/[1.45] text-ink-2');

export const FieldValue = styled('field-value', 'div', 'text-[17px]/[1.45] tracking-[-0.01em]');

export const FieldSource = styled(
  'field-source',
  'div',
  'mt-[3px] flex items-center gap-[5px] text-xs/[1.45] text-ink-3',
);
