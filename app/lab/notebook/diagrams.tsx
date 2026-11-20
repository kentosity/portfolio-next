type DiagramProps = {
  selectedStage: number;
  language: "en" | "ja";
};

function Arrow({ path }: { path: string }) {
  return (
    <path
      data-draw
      className="flow-line"
      d={path}
      markerEnd="url(#notebook-arrow)"
    />
  );
}

export function DiagramDefinitions() {
  return (
    <svg className="diagram-definitions" aria-hidden="true">
      <defs>
        <marker
          id="notebook-arrow"
          viewBox="0 0 12 10"
          refX="10"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path
            d="M2 1 Q6 4 10 5 Q6 6 2 9"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </marker>
        <pattern
          id="notebook-hatch"
          width="7"
          height="7"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-30)"
        >
          <path d="M0 0V7" stroke="#b9beb6" strokeWidth="1" />
        </pattern>
      </defs>
    </svg>
  );
}

export function DataDiagram({ selectedStage, language }: DiagramProps) {
  const isJapanese = language === "ja";
  return (
    <svg
      viewBox="0 0 760 420"
      className="notebook-diagram"
      role="img"
      aria-label={
        isJapanese
          ? "POSデータを収集し、欠落と重複を検出して、レポートへつなぐ概念図"
          : "Conceptual diagram: collect POS exports, check missing and duplicate inputs, and explore reports"
      }
    >
      <g className="construction-lines" aria-hidden="true">
        <path d="M29 313L421 75L731 251M52 167L358 350L708 142M124 349V104M409 357V61M678 310V84" />
        <ellipse cx="407" cy="284" rx="98" ry="36" />
        <path d="M26 365H719M30 358v14m687-14v14" />
      </g>
      <g
        className={`diagram-part ${selectedStage === 0 ? "is-inspected" : ""}`}
      >
        <path
          data-draw
          className="paper-fill"
          d="M54 157L174 94L233 129L232 237L113 306L54 269Z"
        />
        <path
          data-draw
          d="M54 157L113 192L233 129M113 192V306M62 155L174 96M55 161L55 268"
        />
        <path className="hatch-fill" d="M54 164L105 195L105 292L54 265Z" />
        <path
          data-draw
          className="paper-fill"
          d="M123 196L217 144L217 223L124 276Z"
        />
        <path d="M134 201L204 163M134 214L180 189M134 240L202 202M134 250L176 226" />
        <path d="M66 230L93 246M67 236L92 251M67 242L94 258" />
        <text x="138" y="308" transform="rotate(-29 138 308)">
          POS exports
        </text>
        <g transform="translate(249 191) rotate(-5)">
          <path
            data-draw
            className="paper-fill"
            d="M0 0L45-26L72-11L28 16ZM0 8L28 24L72-3M0 16L28 32L72 5"
          />
          <path d="M13 0L44-18M22 5L53-13" />
        </g>
        <text className="sketch-note" x="39" y="77">
          {isJapanese ? "日々のデータを集める" : "a little data, every day"}
        </text>
        <path
          className="annotation-line"
          d="M124 83Q99 92 92 125M85 117L92 127L100 119"
        />
      </g>
      <Arrow path="M231 246Q266 263 300 234" />
      <Arrow path="M323 196Q342 187 354 165" />
      <g
        className={`diagram-part ${selectedStage === 1 ? "is-inspected" : ""}`}
      >
        <path
          data-draw
          className="paper-fill"
          d="M360 133C360 100 465 100 465 133L465 229C465 262 360 261 360 229Z"
        />
        <ellipse data-draw cx="412.5" cy="133" rx="52.5" ry="23" />
        <path
          data-draw
          d="M360 163C363 194 461 193 465 163M360 195C363 226 461 225 465 195M360 225C363 254 462 254 465 225"
        />
        <path
          className="construction-lines"
          d="M367 138C382 151 441 153 459 138M367 169C382 182 441 184 459 169M367 201C382 214 441 216 459 201"
        />
        <path className="flow-line" d="M398 129L409 136L429 121" />
        <text x="371" y="287">
          BigQuery
        </text>
        <text className="sketch-note" x="298" y="330">
          {isJapanese ? "欠落・重複を検出" : "catch the gaps + duplicates"}
        </text>
        <path
          className="annotation-line"
          d="M425 305Q446 287 440 258M434 266L440 256L448 264"
        />
      </g>
      <Arrow path="M476 167Q499 174 523 150" />
      <g
        className={`diagram-part ${selectedStage === 2 ? "is-inspected" : ""}`}
      >
        <path
          data-draw
          className="paper-fill"
          d="M528 115L653 45L711 78L711 208L584 280L527 246Z"
        />
        <path
          data-draw
          d="M528 115L584 148L711 78M584 148V280M592 157L701 95L701 197L592 260Z"
        />
        <path className="hatch-fill" d="M533 126L576 151L576 266L533 242Z" />
        <path
          data-draw
          d="M602 177L688 129M603 190L645 167M603 236L603 217L615 211L615 230M628 222L628 196L640 189L640 215M653 208L653 175L665 169L665 201M678 193L678 156L689 150L689 187"
        />
        <path d="M631 254L631 278L656 292M631 278L610 290L634 304L656 292" />
        <text x="650" y="331" textAnchor="middle">
          React dashboard
        </text>
        <text className="sketch-note" x="521" y="32">
          {isJapanese ? "使えるレポートへ！" : "make it useful!"}
        </text>
        <path
          className="annotation-line"
          d="M613 32Q645 23 666 50M656 46L668 53L667 41"
        />
      </g>
      <text className="drawing-caption" x="35" y="393">
        {isJapanese
          ? "データの流れ / 概念スケッチ"
          : "Data flow / conceptual sketch"}
      </text>
      <path
        className="annotation-line"
        d="M592 369q22 9 49-2m-45 7q25 6 47-4"
      />
    </svg>
  );
}

export function SpeechDiagram({ selectedStage, language }: DiagramProps) {
  const isJapanese = language === "ja";
  return (
    <svg
      viewBox="0 0 760 420"
      className="notebook-diagram"
      role="img"
      aria-label={
        isJapanese
          ? "エージェントの応答からストリーミング音声を合成し、単語に同期した字幕と再生へつなぐ概念図"
          : "Conceptual diagram: agent responses become streaming audio with word-timed captions in a macOS player"
      }
    >
      <g className="construction-lines" aria-hidden="true">
        <path d="M31 295H725M85 74V328M383 55V341M662 78V328M48 107L656 314" />
        <ellipse cx="382" cy="206" rx="98" ry="98" />
      </g>
      <g
        className={`diagram-part ${selectedStage === 0 ? "is-inspected" : ""}`}
      >
        <path
          data-draw
          className="paper-fill"
          d="M52 119Q52 113 60 113L217 108L222 257L55 263Z"
        />
        <path data-draw d="M53 136L218 131M65 122H67M76 122H78M88 121H90" />
        <path
          data-draw
          d="M76 162l11 7-11 9M100 179L175 177M77 199L193 196M77 214L166 212M77 229L181 227"
        />
        <text x="77" y="295">
          Agent response
        </text>
        <text className="sketch-note" x="37" y="78">
          {isJapanese ? "読む → 聞く" : "give the words a voice"}
        </text>
      </g>
      <Arrow path="M226 190Q262 176 288 190" />
      <g
        className={`diagram-part ${selectedStage === 1 ? "is-inspected" : ""}`}
      >
        <path
          data-draw
          className="paper-fill"
          d="M305 141L383 97L459 141L458 232L382 276L305 232Z"
        />
        <path
          data-draw
          d="M305 141L382 185L459 141M382 185V276M315 159L371 191V249L315 218Z"
        />
        <path
          data-draw
          className="waveform"
          d="M322 196l6 3 4-18 5 37 4-25 5 18 4-31 5 45 5-18 6 5"
        />
        <path d="M399 198L443 172M399 211L443 185M399 224L430 205M398 237L442 211" />
        <text x="321" y="316">
          MLX / Kokoro
        </text>
        <text className="sketch-note" x="307" y="63">
          {isJapanese ? "小さく分けて、すぐ再生" : "stream it, piece by piece"}
        </text>
        <path
          className="annotation-line"
          d="M391 73Q417 77 419 104M413 97L419 106L425 96"
        />
      </g>
      <Arrow path="M466 185Q496 171 521 187" />
      <g
        className={`diagram-part ${selectedStage === 2 ? "is-inspected" : ""}`}
      >
        <path
          data-draw
          className="paper-fill"
          d="M532 107L712 113L709 280L527 273Z"
        />
        <path
          data-draw
          d="M532 131L711 137M545 120H547M556 121H558M568 121H570"
        />
        <path
          data-draw
          className="waveform"
          d="M548 183l8 0 5-12 6 27 5-46 6 59 6-40 5 27 6-49 6 65 5-37 6 20 6-11 6 3 5-18 7 31 5-21 7 7 5-4"
        />
        <path d="M553 239L686 243M570 235L570 248M611 235L611 248M653 237L653 250" />
        <path className="flow-line" d="M583 223L621 224" />
        <text className="player-caption" x="549" y="224">
          one word at a time
        </text>
        <text x="566" y="312">
          macOS player
        </text>
        <text className="sketch-note" x="533" y="361">
          {isJapanese ? "字幕も、同じタイミングで" : "the captions keep up."}
        </text>
        <path
          className="annotation-line"
          d="M651 340Q684 323 681 280M675 288L681 278L688 288"
        />
      </g>
      <text className="drawing-caption" x="35" y="393">
        {isJapanese
          ? "応答から音声へ / 概念スケッチ"
          : "Words to audio / conceptual sketch"}
      </text>
    </svg>
  );
}

export function EventDiagram({ selectedStage, language }: DiagramProps) {
  const isJapanese = language === "ja";
  return (
    <svg
      viewBox="0 0 760 420"
      className="notebook-diagram"
      role="img"
      aria-label={
        isJapanese
          ? "LINEの予約から共通バリデーションを通し、予約・チェックイン機能を分離したイベント基盤の概念図"
          : "Conceptual diagram: LINE reservations pass shared validation into separate reservation and check-in features"
      }
    >
      <g className="construction-lines" aria-hidden="true">
        <path d="M39 307H718M142 65V341M384 59V344M625 66V344M43 125L705 308" />
        <path d="M40 366H716M43 361v10m670-10v10" />
      </g>
      <g
        className={`diagram-part ${selectedStage === 0 ? "is-inspected" : ""}`}
      >
        <path
          data-draw
          className="paper-fill"
          d="M90 95L185 90L192 279L94 284Z"
        />
        <path
          data-draw
          d="M93 118L185 114M96 258L189 254M126 105L150 103M136 271H148"
        />
        <path
          data-draw
          d="M111 145L168 142L169 182L144 183L132 194L131 184L113 185ZM114 214L169 211M114 229L153 227"
        />
        <text className="player-caption" x="124" y="168">
          LINE
        </text>
        <text x="92" y="319">
          Reservation
        </text>
        <text className="sketch-note" x="55" y="60">
          {isJapanese ? "ゲストの入り口" : "start with the guest"}
        </text>
      </g>
      <Arrow path="M200 190Q235 174 271 191" />
      <g
        className={`diagram-part ${selectedStage === 1 ? "is-inspected" : ""}`}
      >
        <path
          data-draw
          className="paper-fill"
          d="M289 146L383 96L471 145L470 234L382 283L288 235Z"
        />
        <path
          data-draw
          d="M289 146L382 198L471 145M382 198V283M306 164L368 199V251L306 217Z"
        />
        <path className="flow-line" d="M322 197L333 212L356 196" />
        <text x="323" y="322">
          Shared validation
        </text>
        <text className="sketch-note" x="318" y="58">
          {isJapanese ? "ルールをひとつに" : "one set of rules"}
        </text>
        <path
          className="annotation-line"
          d="M393 65Q406 75 403 96M398 89L403 98L410 89"
        />
      </g>
      <Arrow path="M480 174C511 172 517 126 547 128" />
      <Arrow path="M480 215C511 214 515 263 548 263" />
      <g
        className={`diagram-part ${selectedStage === 2 ? "is-inspected" : ""}`}
      >
        <path
          data-draw
          className="paper-fill"
          d="M556 85L674 84L693 104L692 166L556 169ZM556 214L674 213L693 233L692 295L556 298Z"
        />
        <path
          data-draw
          d="M556 108L692 107M675 85V104H692M556 237L692 236M675 214V233H692"
        />
        <text x="573" y="145">
          Reservation
        </text>
        <text x="578" y="274">
          Check-in
        </text>
        <path
          className="hatch-fill"
          d="M559 151L688 149V165L559 166ZM559 280L688 279V293L559 295Z"
        />
        <text className="sketch-note" x="526" y="349">
          {isJapanese ? "イベントごとに再利用" : "reuse for the next event"}
        </text>
        <path
          className="annotation-line"
          d="M708 85Q725 186 710 295M705 86L712 83L719 88M704 294L710 300L717 293"
        />
      </g>
      <text className="drawing-caption" x="35" y="393">
        {isJapanese
          ? "機能を分ける / 概念スケッチ"
          : "Separate the responsibilities / conceptual sketch"}
      </text>
    </svg>
  );
}
