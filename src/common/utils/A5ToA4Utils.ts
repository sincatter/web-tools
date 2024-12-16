// src/A5ToA4Utils.ts
import {PDFDocument, PDFEmbeddedPage} from 'pdf-lib';

// A4 和 A5 的标准尺寸
const A4_WIDTH = 595;
const A4_HEIGHT = 842;
// const A5_WIDTH = 420;
// const A5_HEIGHT = 595;

/**
 * 合并多个 A5 发票为一个 A4 PDF
 * @param a5Files A5 文件列表
 * @param scaleFactor 缩放比例
 * @returns 合并后的 A4 PDF 文件字节流
 */
export const mergeA5ToA4 = async (a5Files: File[], scaleFactor: number): Promise<Uint8Array> => {
    // 创建新的 PDF 文档
    const pdfDoc = await PDFDocument.create();

    const maxInvoicesPerPage = 2; // 每个 A4 页面最多放置两张 A5 发票
    let currentA4Page = pdfDoc.addPage([A4_WIDTH, A4_HEIGHT]); // 当前的 A4 页面
    let currentInvoiceCount = 0; // 当前 A4 页面上的发票数

    for (const a5File of a5Files) {
        // 加载当前 A5 PDF
        const fileBytes = await a5File.arrayBuffer();
        const a5Pdf = await PDFDocument.load(fileBytes);

        // 获取 A5 PDF 中的每一页
        const a5Pages = a5Pdf.getPages();

        for (let i = 0; i < a5Pages.length; i++) {
            // 每当当前 A4 页面已满，就创建一个新的 A4 页面
            if (currentInvoiceCount === maxInvoicesPerPage) {
                currentA4Page = pdfDoc.addPage([A4_WIDTH, A4_HEIGHT]);
                currentInvoiceCount = 0; // 重置发票计数
            }

            // 嵌入 A5 页面
            const embeddedPage: PDFEmbeddedPage = await pdfDoc.embedPage(a5Pages[i]);

            // 计算缩放后的发票尺寸
            const scaledWidth = embeddedPage.width * scaleFactor;
            const scaledHeight = embeddedPage.height * scaleFactor;

            // 计算居中位置（水平居中）
            const xOffset = (A4_WIDTH - scaledWidth) / 2; // 水平居中

            let yOffset = 0;
            if (currentInvoiceCount === 0) {
                // 第二张发票放置在上半部分
                yOffset = (A4_HEIGHT / 2) + (A4_HEIGHT / 2) - (scaledHeight / 2) - (A4_HEIGHT / 4); // 下半部分居中，减去四分之一的高度
            } else if (currentInvoiceCount === 1) {
                // 第一张发票放置在下半部分
                yOffset = (A4_HEIGHT / 2) - (scaledHeight / 2) - (A4_HEIGHT / 4); // 下半部分居中，减去四分之一的高度
            }

            // 在当前 A4 页面绘制发票
            currentA4Page.drawPage(embeddedPage, {
                x: xOffset,
                y: yOffset,
                width: scaledWidth,
                height: scaledHeight,
            });

            currentInvoiceCount++; // 增加当前A4页面上的发票计数
        }
    }
    // 返回合并后的 PDF 文件字节流
    return await pdfDoc.save();
};
