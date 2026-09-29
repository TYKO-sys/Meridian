# -*- coding: utf-8 -*-
"""Merge cover + body into the final playbook PDF (A4-normalized)."""
from pypdf import PdfReader, PdfWriter

A4_W, A4_H = 595.28, 841.89
COVER = '/home/z/my-project/scripts/cover.pdf'
BODY = '/home/z/my-project/scripts/body.pdf'
OUT = '/home/z/my-project/download/Higgsfield_Frontier_LLM_Integration_Playbook.pdf'

def normalize(page):
    w, h = float(page.mediabox.width), float(page.mediabox.height)
    if abs(w - A4_W) > 0.3 or abs(h - A4_H) > 0.3:
        page.scale_to(A4_W, A4_H)
    return page

writer = PdfWriter()
writer.add_page(normalize(PdfReader(COVER).pages[0]))
for p in PdfReader(BODY).pages:
    writer.add_page(normalize(p))
writer.add_metadata({
    '/Title': 'Higgsfield x Frontier LLM Integration Playbook',
    '/Author': 'Z.ai',
    '/Creator': 'Z.ai',
    '/Subject': 'Free integration of Higgsfield with frontier language models for one-shot website development',
})
with open(OUT, 'wb') as f:
    writer.write(f)
print('final:', OUT, '| pages:', len(writer.pages))
