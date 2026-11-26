import { List, ListRow, ListRowContent, ListRowTitle } from '@/components/ui/list';
import { Lead, Title } from '@/components/ui/typography';
import { Actions, Button } from '@/components/ui/button';
import { useState } from 'react';
import { I } from '@/ui/icons';
import { Toggle } from '@/ui/primitives';
import type { Ctx } from '@/types';

/* 10: Tłumacz PJM */
export function Pjm(c: Ctx) {
  const [on, setOn] = useState(false);
  return (
    <div>
      <Title>Tłumacz polskiego języka migowego</Title>
      <Lead>Na każdym ekranie przycisk „PJM”. Łączy z tłumaczem na wideo, w dni robocze 8–20.</Lead>
      <div className="rounded-2xl overflow-hidden relative [background:#2c2f36] [&_svg]:block">
        <svg viewBox="0 0 320 200" width="100%" aria-hidden="true">
          <rect width="320" height="200" fill="#2c2f36" />
          <circle cx="160" cy="78" r="28" fill="#e8c9a8" />
          <path d="M104 200c4-48 28-70 56-70s52 22 56 70z" fill="#22408f" />
          <g
            className={
              on
                ? 'motion-safe:[&_path]:animate-[wave_1s_ease-in-out_infinite_alternate] motion-safe:[&_path]:origin-center'
                : ''
            }
          >
            <path
              d="M110 150c-8-24-2-44 10-50"
              stroke="#e8c9a8"
              strokeWidth="14"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M212 150c10-20 16-44 2-58"
              stroke="#e8c9a8"
              strokeWidth="14"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        </svg>
        <div className="absolute left-3 bottom-3 [color:#fff] text-[13px] flex gap-1.5 items-center [background:rgb(0_0_0_/_40%)] p-[4px_10px] rounded-[999px]">
          {on ? (
            <>
              <span className="w-2 h-2 rounded-[50%] [background:#ff4d5e] [box-shadow:0_0_0_0_rgb(255_77_94_/_60%)] motion-safe:animate-[ping_1.6s_ease-out_infinite]"></span>{' '}
              Tłumaczka Marta · połączono
            </>
          ) : (
            'Kamera wyłączona'
          )}
        </div>
      </div>
      <Actions>
        {on ? (
          <Button className="bg-[#ff3b30]" onClick={() => setOn(false)}>
            Zakończ
          </Button>
        ) : (
          <Button onClick={() => setOn(true)}>{I('camera', 18)} Połącz z tłumaczem</Button>
        )}
      </Actions>
      <List className="mt-3.5">
        <ListRow>
          <ListRowContent>
            <ListRowTitle>Przycisk PJM na każdym ekranie</ListRowTitle>
          </ListRowContent>
          <Toggle on={!!c.s.pjm} label="Przycisk PJM" set={(v: boolean) => c.set({ pjm: v })} />
        </ListRow>
        <ListRow>
          <ListRowContent>
            <ListRowTitle>Napisy do komunikatów głosowych</ListRowTitle>
          </ListRowContent>
          <Toggle on={true} label="Napisy" set={() => {}} />
        </ListRow>
      </List>
    </div>
  );
}
