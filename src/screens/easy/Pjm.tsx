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
      <div className="video">
        <svg viewBox="0 0 320 200" width="100%" aria-hidden="true">
          <rect width="320" height="200" fill="#2c2f36" />
          <circle cx="160" cy="78" r="28" fill="#e8c9a8" />
          <path d="M104 200c4-48 28-70 56-70s52 22 56 70z" fill="#22408f" />
          <g className={on ? 'sign' : ''}>
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
        <div className="vlabel">
          {on ? (
            <>
              <span className="lv-dot"></span> Tłumaczka Marta · połączono
            </>
          ) : (
            'Kamera wyłączona'
          )}
        </div>
      </div>
      <Actions>
        {on ? (
          <Button style={{ background: '#ff3b30' }} onClick={() => setOn(false)}>
            Zakończ
          </Button>
        ) : (
          <Button onClick={() => setOn(true)}>{I('camera', 18)} Połącz z tłumaczem</Button>
        )}
      </Actions>
      <List style={{ marginTop: '14px' }}>
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
