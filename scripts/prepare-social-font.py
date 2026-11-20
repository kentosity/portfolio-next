#!/usr/bin/env python3
"""Create a static subset of the OFL-licensed Noto Sans JP font for social images."""
import argparse
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--font", type=Path, required=True)
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[1]
    text = (root / "app/content/site-content.ts").read_text() + (root / "app/content/copy.ts").read_text()
    font = instantiateVariableFont(TTFont(args.font), {"wght": 500}, inplace=True)
    options = subset.Options()
    options.layout_features = []
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(text=text)
    subsetter.subset(font)
    for record in font["name"].names:
        if record.nameID in [1, 4, 6]:
            record.string = "PortfolioSocial".encode(record.getEncoding())
    output = root / "assets/social-font.ttf"
    output.parent.mkdir(exist_ok=True)
    font.save(output)
    print(f"Prepared {output.name}: {output.stat().st_size} bytes")


if __name__ == "__main__":
    main()
