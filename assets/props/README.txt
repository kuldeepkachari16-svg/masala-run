Final edge-prop strips (<city>-<day|night>.png), written by tools/import_art.py
(kind "prop"). Transparent vertical columns of a city's curb props — NO road baked
in. game.js (drawCityEdges) tiles each strip down BOTH live arena edges over the
procedural road, so they show on every device aspect with no crop. Consumed by the
"city-art" theme (edgeProps).
