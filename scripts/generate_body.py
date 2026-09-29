# -*- coding: utf-8 -*-
"""ReportLab body generator for the Higgsfield x Frontier LLM Integration Playbook.
Follows the pdf skill report brief: TocDocTemplate + multiBuild, FreeSerif family,
Template 07 Crystal Blue body palette, Paragraph-wrapped table cells, safe KeepTogether.
"""
import os, sys, hashlib, html as htmlmod

PDF_SKILL_DIR = '/home/z/my-project/skills/pdf'
sys.path.insert(0, os.path.join(PDF_SKILL_DIR, 'scripts'))
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_JUSTIFY, TA_CENTER
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
                                PageBreak, CondPageBreak, KeepTogether, HRFlowable)
from reportlab.platypus.tableofcontents import TableOfContents
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily

from content_data import CHAPTERS, TITLE, SUBJECT

# ------------------------------------------------------------------ fonts
FONT_DIR = '/usr/share/fonts'
pdfmetrics.registerFont(TTFont('NotoSerifSC', f'{FONT_DIR}/truetype/noto-serif-sc/NotoSerifSC-Regular.ttf'))
pdfmetrics.registerFont(TTFont('NotoSerifSC-Bold', f'{FONT_DIR}/truetype/noto-serif-sc/NotoSerifSC-Bold.ttf'))
pdfmetrics.registerFont(TTFont('FreeSerif', f'{FONT_DIR}/truetype/freefont/FreeSerif.ttf'))
pdfmetrics.registerFont(TTFont('FreeSerif-Bold', f'{FONT_DIR}/truetype/freefont/FreeSerifBold.ttf'))
pdfmetrics.registerFont(TTFont('FreeSerif-Italic', f'{FONT_DIR}/truetype/freefont/FreeSerifItalic.ttf'))
pdfmetrics.registerFont(TTFont('FreeSerif-BoldItalic', f'{FONT_DIR}/truetype/freefont/FreeSerifBoldItalic.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuSans', f'{FONT_DIR}/truetype/dejavu/DejaVuSansMono.ttf'))
registerFontFamily('NotoSerifSC', normal='NotoSerifSC', bold='NotoSerifSC-Bold')
registerFontFamily('FreeSerif', normal='FreeSerif', bold='FreeSerif-Bold',
                   italic='FreeSerif-Italic', boldItalic='FreeSerif-BoldItalic')
registerFontFamily('DejaVuSans', normal='DejaVuSans', bold='DejaVuSans')

from pdf import install_font_fallback
install_font_fallback()

# ------------------------------------------------------- Template 07 palette
PAGE_BG      = colors.HexColor('#f5f8fc')
CARD_BG      = colors.HexColor('#e4ecf5')
TABLE_STRIPE = colors.HexColor('#eef3fa')
HEADER_FILL  = colors.HexColor('#1a4a7a')
BORDER       = colors.HexColor('#c0d0e2')
ACCENT       = colors.HexColor('#2d7ab3')
TEXT_PRIMARY = colors.HexColor('#142840')
TEXT_MUTED   = colors.HexColor('#5a7a96')

# ------------------------------------------------------------------ layout
MARGIN = 1.0 * inch
PAGE_W, PAGE_H = A4
AVAIL_W = PAGE_W - 2 * MARGIN
AVAIL_H = PAGE_H - 2 * MARGIN
H1_THRESHOLD = AVAIL_H * 0.25
MAX_KEEP = PAGE_H * 0.4

# ------------------------------------------------------------------ styles
S = {}
S['h1'] = ParagraphStyle('H1', fontName='FreeSerif', fontSize=20, leading=25,
                         textColor=TEXT_PRIMARY, spaceBefore=6, spaceAfter=4)
S['h2'] = ParagraphStyle('H2', fontName='FreeSerif', fontSize=14.5, leading=19,
                         textColor=HEADER_FILL, spaceBefore=16, spaceAfter=6)
S['h3'] = ParagraphStyle('H3', fontName='FreeSerif', fontSize=11.5, leading=15,
                         textColor=TEXT_PRIMARY, spaceBefore=12, spaceAfter=4)
S['body'] = ParagraphStyle('Body', fontName='FreeSerif', fontSize=10.5, leading=17,
                           textColor=TEXT_PRIMARY, alignment=TA_JUSTIFY,
                           spaceBefore=0, spaceAfter=9)
S['lead'] = ParagraphStyle('Lead', fontName='FreeSerif-Italic', fontSize=11, leading=17.5,
                           textColor=TEXT_MUTED, alignment=TA_LEFT,
                           spaceBefore=0, spaceAfter=11)
S['bullet'] = ParagraphStyle('Bullet', parent=S['body'], alignment=TA_LEFT,
                             leftIndent=18, firstLineIndent=-12, spaceAfter=7)
S['num'] = ParagraphStyle('Num', parent=S['body'], alignment=TA_LEFT,
                          leftIndent=22, firstLineIndent=-16, spaceAfter=7)
S['code'] = ParagraphStyle('Code', fontName='DejaVuSans', fontSize=8, leading=11.5,
                           textColor=TEXT_PRIMARY, alignment=TA_LEFT)
S['th'] = ParagraphStyle('TH', fontName='FreeSerif', fontSize=9.5, leading=12.5,
                         textColor=colors.white, alignment=TA_CENTER)
S['td'] = ParagraphStyle('TD', fontName='FreeSerif', fontSize=9, leading=12.5,
                         textColor=TEXT_PRIMARY, alignment=TA_LEFT)
S['caption'] = ParagraphStyle('Caption', fontName='FreeSerif', fontSize=8.5, leading=11,
                              textColor=TEXT_MUTED, alignment=TA_CENTER,
                              spaceBefore=3, spaceAfter=6)
S['callout_t'] = ParagraphStyle('CalloutT', fontName='FreeSerif', fontSize=10.5, leading=14,
                                textColor=ACCENT, alignment=TA_LEFT)
S['callout_b'] = ParagraphStyle('CalloutB', fontName='FreeSerif', fontSize=10, leading=15.5,
                                textColor=TEXT_PRIMARY, alignment=TA_LEFT)
S['toc_t'] = ParagraphStyle('TOCTitle', fontName='FreeSerif', fontSize=20, leading=25,
                            textColor=TEXT_PRIMARY, spaceAfter=14)
S['toc0'] = ParagraphStyle('TOC0', fontName='FreeSerif', fontSize=11.5, leading=20,
                           textColor=TEXT_PRIMARY, leftIndent=0)
S['toc1'] = ParagraphStyle('TOC1', fontName='FreeSerif', fontSize=10, leading=16,
                           textColor=TEXT_MUTED, leftIndent=18)

# ------------------------------------------------------------------ helpers
def esc(t):
    return htmlmod.escape(t)

def code_para(text):
    """Escape code text, preserve line breaks and leading spaces."""
    lines = text.split('\n')
    out = []
    for ln in lines:
        stripped = esc(ln).lstrip(' ')
        n = len(esc(ln)) - len(esc(ln).lstrip(' '))
        out.append(' ' * n + stripped if stripped else ' ')
    return Paragraph('<br/>'.join(out), S['code'])

def add_heading(text, style, level=0):
    key = 'h_%s' % hashlib.md5(text.encode()).hexdigest()[:8]
    p = Paragraph('<a name="%s"/><b>%s</b>' % (key, esc(text)), style)
    p.bookmark_name = key
    p.bookmark_level = level
    p.bookmark_text = text
    p.bookmark_key = key
    return p

def safe_keep(elements):
    total_h = 0
    for el in elements:
        try:
            w, h = el.wrap(AVAIL_W, PAGE_H)
        except Exception:
            h = 40
        total_h += h
    if total_h <= MAX_KEEP:
        return [KeepTogether(elements)]
    elif len(elements) >= 2:
        return [KeepTogether(elements[:2])] + list(elements[2:])
    return list(elements)

def make_table(headers, rows, ratios):
    col_widths = [r * AVAIL_W for r in ratios]
    assert sum(col_widths) <= AVAIL_W + 0.5, 'table overflow'
    data = [[Paragraph('<b>%s</b>' % esc(h), S['th']) for h in headers]]
    for row in rows:
        data.append([Paragraph(c, S['td']) for c in row])
    t = Table(data, colWidths=col_widths, repeatRows=1, hAlign='CENTER')
    style = [
        ('BACKGROUND', (0, 0), (-1, 0), HEADER_FILL),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER),
        ('LEFTPADDING', (0, 0), (-1, -1), 7),
        ('RIGHTPADDING', (0, 0), (-1, -1), 7),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
    ]
    for i in range(1, len(data)):
        style.append(('BACKGROUND', (0, i), (-1, i),
                      colors.white if i % 2 == 1 else TABLE_STRIPE))
    t.setStyle(TableStyle(style))
    return t

def make_callout(title, text):
    inner = [[Paragraph('<b>%s</b>' % esc(title), S['callout_t'])],
             [Paragraph(text, S['callout_b'])]]
    t = Table(inner, colWidths=[AVAIL_W * 0.94], hAlign='CENTER')
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), CARD_BG),
        ('LINEBEFORE', (0, 0), (0, -1), 3, ACCENT),
        ('BOX', (0, 0), (-1, -1), 0.5, BORDER),
        ('LEFTPADDING', (0, 0), (-1, -1), 12),
        ('RIGHTPADDING', (0, 0), (-1, -1), 12),
        ('TOPPADDING', (0, 0), (0, 0), 9),
        ('BOTTOMPADDING', (0, 0), (0, 0), 2),
        ('TOPPADDING', (0, 1), (0, 1), 2),
        ('BOTTOMPADDING', (0, 1), (0, 1), 9),
    ]))
    return t

def make_code_block(text):
    t = Table([[code_para(text)]], colWidths=[AVAIL_W * 0.94], hAlign='CENTER')
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), CARD_BG),
        ('LINEBEFORE', (0, 0), (0, -1), 3, ACCENT),
        ('LEFTPADDING', (0, 0), (-1, -1), 12),
        ('RIGHTPADDING', (0, 0), (-1, -1), 10),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    return t

# ------------------------------------------------------------ page painter
def paint_page(canv, doc):
    canv.saveState()
    # full-page background (Template 07 body tint)
    canv.setFillColor(PAGE_BG)
    canv.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)
    # header
    canv.setFont('FreeSerif', 7.5)
    canv.setFillColor(TEXT_MUTED)
    canv.drawString(MARGIN, PAGE_H - 0.62 * inch, TITLE)
    canv.setStrokeColor(ACCENT)
    canv.setLineWidth(1.2)
    canv.line(MARGIN, PAGE_H - 0.70 * inch, PAGE_W - MARGIN, PAGE_H - 0.70 * inch)
    # footer
    canv.setStrokeColor(BORDER)
    canv.setLineWidth(0.5)
    canv.line(MARGIN, 0.66 * inch, PAGE_W - MARGIN, 0.66 * inch)
    canv.setFont('FreeSerif', 7.5)
    canv.setFillColor(TEXT_MUTED)
    canv.drawString(MARGIN, 0.48 * inch, 'Prepared by Z.ai')
    roman = {1: 'i', 2: 'ii', 3: 'iii'}
    if doc.page in roman and doc.page <= FRONT_PAGES:
        label = roman[doc.page]
    else:
        label = str(doc.page - FRONT_PAGES)
    canv.drawRightString(PAGE_W - MARGIN, 0.48 * inch, label)
    canv.restoreState()

FRONT_PAGES = 1  # TOC page count (roman); body arabic starts after

# ------------------------------------------------------------ doc template
class TocDocTemplate(SimpleDocTemplate):
    def afterFlowable(self, flowable):
        if hasattr(flowable, 'bookmark_name'):
            level = getattr(flowable, 'bookmark_level', 0)
            text = getattr(flowable, 'bookmark_text', '')
            key = getattr(flowable, 'bookmark_key', '')
            # store body-relative page number (footer numbering)
            self.notify('TOCEntry', (level, text, self.page - FRONT_PAGES, key))

def build():
    out = '/home/z/my-project/scripts/body.pdf'
    doc = TocDocTemplate(out, pagesize=A4,
                         leftMargin=MARGIN, rightMargin=MARGIN,
                         topMargin=1.0 * inch, bottomMargin=0.95 * inch,
                         title=TITLE, author='Z.ai', creator='Z.ai', subject=SUBJECT)
    story = []

    # ---- TOC page
    story.append(Paragraph('<b>Contents</b>', S['toc_t']))
    story.append(HRFlowable(width='100%', color=ACCENT, thickness=1.2,
                            spaceBefore=0, spaceAfter=10))
    toc = TableOfContents()
    toc.levelStyles = [S['toc0'], S['toc1']]
    story.append(toc)
    story.append(PageBreak())

    # ---- chapters
    chapter_no = 0
    for chapter in CHAPTERS:
        pending_heading = None       # list of flowables awaiting first body block
        for i, block in enumerate(chapter):
            kind = block[0]
            if kind == 'h1':
                chapter_no += 1
                text = '%d.  %s' % (chapter_no, block[1])
                h = add_heading(text, S['h1'], level=0)
                rule = HRFlowable(width='100%', color=ACCENT, thickness=1.6,
                                  spaceBefore=0, spaceAfter=10)
                story.append(CondPageBreak(H1_THRESHOLD))
                pending_heading = [Spacer(1, 10), h, rule]
            elif kind == 'h2':
                h = add_heading(block[1], S['h2'], level=1)
                if pending_heading is None:
                    story.append(CondPageBreak(H1_THRESHOLD * 0.5))
                    pending_heading = [h]
                else:
                    pending_heading.append(h)
            elif kind == 'h3':
                pending_heading = pending_heading or []
                pending_heading.append(Paragraph('<b>%s</b>' % esc(block[1]), S['h3']))
            else:
                # build the flowable(s) for this block
                flows = []
                if kind == 'lead':
                    flows = [Paragraph(block[1], S['lead'])]
                elif kind == 'body':
                    flows = [Paragraph(block[1], S['body'])]
                elif kind == 'bullet':
                    for item in block[1]:
                        flows.append(Paragraph('\u2022  ' + item, S['bullet']))
                    flows.append(Spacer(1, 3))
                elif kind == 'numbered':
                    for n, item in enumerate(block[1], 1):
                        flows.append(Paragraph('%d.  %s' % (n, esc(item)), S['num']))
                    flows.append(Spacer(1, 3))
                elif kind == 'table':
                    headers, rows, ratios = block[1]
                    flows = [Spacer(1, 6), make_table(headers, rows, ratios), Spacer(1, 12)]
                elif kind == 'code':
                    flows = [Spacer(1, 4), make_code_block(block[1]), Spacer(1, 10)]
                elif kind == 'callout':
                    title, text = block[1]
                    flows = [Spacer(1, 6), make_callout(title, text), Spacer(1, 12)]
                elif kind == 'caption':
                    flows = [Paragraph(esc(block[1]), S['caption'])]
                else:
                    raise ValueError('unknown block %r' % kind)

                if pending_heading is not None:
                    first = flows[0] if flows else Spacer(1, 1)
                    story.extend(safe_keep(pending_heading + [first]))
                    story.extend(flows[1:])
                    pending_heading = None
                else:
                    story.extend(flows)
        if pending_heading is not None:
            story.extend(pending_heading)
            pending_heading = None
    doc.multiBuild(story, onFirstPage=paint_page, onLaterPages=paint_page)
    print('body built:', out)

if __name__ == '__main__':
    build()
