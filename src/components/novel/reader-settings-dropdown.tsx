"use client";

import { Settings, Type, AlignJustify, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import {
  FONT_OPTIONS,
  THEME_OPTIONS,
  ALIGNMENT_OPTIONS,
} from "@/lib/constants";

interface ReaderSettingsDropdownProps {
  fontSize: number;
  lineHeight: number;
  fontFamily: string;
  textAlignment: string;
  theme: string;
  setFontSize: (size: number) => void;
  setLineHeight: (height: number) => void;
  setFontFamily: (family: string) => void;
  setTextAlignment: (alignment: string) => void;
  setTheme: (theme: string) => void;
}

export function ReaderSettingsDropdown({
  fontSize,
  lineHeight,
  fontFamily,
  textAlignment,
  theme,
  setFontSize,
  setLineHeight,
  setFontFamily,
  setTextAlignment,
  setTheme,
}: ReaderSettingsDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="w-5 h-5" />
          <span className="sr-only">Settings</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[240px]">
        <div className="space-y-4 p-2">
          <div>
            <h4 className="mb-1 font-medium text-sm">Font Size</h4>
            <div className="flex items-center space-x-2">
              <Type className="w-4 h-4" />
              <Slider
                value={[fontSize]}
                min={12}
                max={24}
                step={1}
                onValueChange={(value) => setFontSize(value[0])}
              />
            </div>
          </div>

          <div>
            <h4 className="mb-1 font-medium text-sm">Line Height</h4>
            <div className="flex items-center space-x-2">
              <AlignJustify className="w-4 h-4" />
              <Slider
                value={[lineHeight * 10]}
                min={15}
                max={25}
                step={1}
                onValueChange={(value) => setLineHeight(value[0] / 10)}
              />
            </div>
          </div>

          <div>
            <h4 className="mb-1 font-medium text-sm">Font Family</h4>
            <div className="flex flex-wrap gap-2">
              {FONT_OPTIONS.map((font) => (
                <Button
                  key={font.value}
                  variant={fontFamily === font.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFontFamily(font.value)}
                  className="flex-1"
                >
                  {font.name}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-1 font-medium text-sm">Text Alignment</h4>
            <div className="flex gap-2">
              {ALIGNMENT_OPTIONS.map((align) => (
                <Button
                  key={align.value}
                  variant={
                    textAlignment === align.value ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setTextAlignment(align.value)}
                  className="flex-1"
                >
                  <align.icon className="w-4 h-4" />
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-1 font-medium text-sm">Theme</h4>
            <div className="flex flex-wrap gap-2">
              {THEME_OPTIONS.map((t) => (
                <Button
                  key={t.value}
                  variant={theme === t.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme(t.value)}
                  className="flex-1"
                >
                  {t.value === "light" && <Sun className="mr-1 w-4 h-4" />}
                  {t.value === "dark" && <Moon className="mr-1 w-4 h-4" />}
                  {t.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
