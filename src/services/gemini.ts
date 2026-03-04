export interface ScriptData {
  zodiac: string;
  topic: string;
  time: string;
}

export interface SlideContent {
  title: string;
  textOnImage: string;
  imagePrompt: string;
  voiceover: string;
}

export async function generateScript(data: ScriptData): Promise<SlideContent[]> {
  const prompt = `
# ROLE & GOAL
Bạn là một Thầy Phong Thủy & Tử Vi cao tay. Nhiệm vụ của bạn là tạo kịch bản "Ảnh cuộn" (Photo Swipe) TikTok mang đậm màu sắc Á Đông, Huyền bí, Sáng rõ.

# CRITICAL REQUIREMENTS
1. **BÁM SÁT CHỦ ĐỀ (THEMATIC CONSISTENCY)**: Chủ đề là gì thì hình ảnh và lời khuyên phải xoay quanh cái đó. Tuyệt đối không lạc đề.
   - Ví dụ: Chủ đề "Tài lộc" -> Hình ảnh phải có Vàng, Thần Tài, Cây Tiền, Hũ Gạo. Lời khuyên về ví tiền, két sắt, hướng Đông Nam.
   - Ví dụ: Chủ đề "Tình duyên" -> Hình ảnh phải có Dây tơ hồng, Trăng, Hồ ly, Uyên ương. Lời khuyên về giường ngủ, hoa đào, hướng Tây Nam.
   - Ví dụ: Chủ đề "Sức khỏe" -> Hình ảnh Hồ lô, Hoa sen, Ánh sáng chữa lành.
2. **CÓ CÁCH HÓA GIẢI CỤ THỂ (ACTIONABLE ADVICE)**: Slide 4 và 5 bắt buộc phải đưa ra hành động cụ thể (đeo gì, cúng gì, đặt gì, làm gì) để hóa giải hạn hoặc kích hoạt vận may. Không nói chung chung.
3. **CÔ ĐỌNG**: Lời dẫn tối đa 2 câu. Chữ trên ảnh tối đa 8 chữ.

# VISUAL STYLE (Phong cách hình ảnh)
- **Thẩm mỹ**: Tiên Hiệp, Thần Thoại, Rực rỡ (Radiant).
- **Màu sắc**: Tùy theo chủ đề nhưng phải sang trọng (Vàng Kim, Đỏ Chu Sa, Trắng Ngọc).
- **Ánh sáng**: Hào quang rực rỡ, rõ nét (8k resolution).

# SLIDE STRUCTURE
- Slide 1: **TÍN HIỆU** - Hình ảnh: Biểu tượng chủ đạo của chủ đề đang phát sáng hoặc báo hiệu. Text: Cảnh báo/Tin vui đích danh.
- Slide 2: **THỰC TRẠNG** - Hình ảnh: Diễn tả rõ vấn đề/nỗi đau của chủ đề đó dưới ánh sáng tâm linh. Text: Vạch trần sự thật.
- Slide 3: **NGUYÊN DO** - Hình ảnh: Sao chiếu mệnh hoặc yếu tố tâm linh tác động. Text: Lý do ngắn gọn.
- Slide 4: **HÓA GIẢI (QUAN TRỌNG)** - Hình ảnh: Vật phẩm phong thủy hoặc hành động cụ thể để giải quyết vấn đề. Text: Cách hóa giải (Ngắn gọn).
- Slide 5: **LỜI KHUYÊN/KẾT QUẢ** - Hình ảnh: Kết quả viên mãn sau khi hóa giải. Text: Lời khuyên cuối/Kêu gọi đón nhận.

# INPUT
${data.zodiac} + ${data.topic} + ${data.time}

# RESPONSE FORMAT (JSON)
Trả về kết quả dưới dạng JSON array, mỗi phần tử là một object có cấu trúc sau (không bọc trong markdown code block):
[
  {
    "title": "Slide 1: [Tiêu đề ngắn]",
    "textOnImage": "[Tiếng Việt, Max 8 chữ]",
    "imagePrompt": "[English Prompt describing the specific topic visual: Bright, Divine, High Detail, 8k...] --ar 9:16, thiết kế bằng tiếng việt",
    "voiceover": "[Tiếng Việt, Max 2 câu]"
  },
  ...
]
`;

  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to generate script");
    }

    const result = await response.json();
    return result as SlideContent[];
  } catch (error) {
    console.error("Error generating script:", error);
    throw error;
  }
}
