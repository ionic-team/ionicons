## QML Example for using Ionicons

All logic is in main.qml.

To use in your project:

Import ionicons codepoint for qml:

```
import "ionicons.js" as Ionicons
```

Load font file using FontLoader:

```
FontLoader { source: "ionicons.ttf" }
```

Use:

```
Text { font.family: "Ionicons"; text: Ionicons.img.alert }
```
