// 날짜 포맷 함수
function formatDate(dateStr) {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  return `DATED ${day}. ${month}. ${year}`;
}

// 수료증 내용 렌더링
function renderCertificate() {
  const name = document.getElementById('name').value;
  const curriculum = document.getElementById('curriculum').value;
  const date = document.getElementById('date').value;

  document.getElementById('output-name').textContent = name;
  document.getElementById('output-course').textContent = curriculum;
  document.getElementById('output-date').textContent = formatDate(date);

  // 수료증 영역과 버튼 표시
  document.getElementById('certificate-area').style.display = 'block';
  document.getElementById('download-buttons').style.display = 'block';

  // ⬇ 왼쪽 정렬 기준 보정
  const nameElem = document.getElementById('output-name');
  const baseLeft = 345; // 3글자 기준
  const charOffset = 22; // 한 글자당 이동 픽셀 (폰트에 따라 조정 필요)
  const nameLength = name.length;
  const offset = (nameLength - 3) * charOffset;

  nameElem.style.left = `${baseLeft + offset}px`;
}



// 입력 변화 감지 → 수료증 만들기 버튼 표시 조건
function checkFormFilled() {
  const name = document.getElementById('name').value.trim();
  const curriculum = document.getElementById('curriculum').value.trim();
  const date = document.getElementById('date').value.trim();
  const generateBtn = document.getElementById('generate-btn');

  if (name && curriculum && date) {
    generateBtn.style.display = 'block';
  } else {
    generateBtn.style.display = 'none';
    document.getElementById('download-buttons').style.display = 'none';
  }
}

// 모든 입력 필드에 change 이벤트 등록
document.getElementById('name').addEventListener('input', checkFormFilled);
document.getElementById('curriculum').addEventListener('change', checkFormFilled);
document.getElementById('date').addEventListener('change', checkFormFilled);


function downloadAsPNG() {
  const cert = document.getElementById('certificate');
  html2canvas(cert).then(canvas => {
    const link = document.createElement('a');
    link.download = 'certificate.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  });
}

function downloadAsPDF() {
  const cert = document.getElementById('certificate');

  html2canvas(cert).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const pdfWidth = canvas.width;
    const pdfHeight = canvas.height;

    const pdf = new jspdf.jsPDF({
      orientation: pdfWidth > pdfHeight ? 'landscape' : 'portrait',
      unit: 'px',
      format: [pdfWidth, pdfHeight],
    });

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);  // 위치와 사이즈 명확히 지정
    pdf.save('certificate.pdf');
  });
}
