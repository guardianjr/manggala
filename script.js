let currentStep = 0;
    const fieldsets = document.querySelectorAll("fieldset");
    const steps = document.querySelectorAll(".progress-step");
    const form = document.getElementById("regForm");
    const previewContent = document.getElementById("previewContent");

    function showStep(n) {
      fieldsets.forEach((fs, i) => fs.classList.toggle("active", i === n));
      steps.forEach((step, i) => step.classList.toggle("active", i <= n));

      // ✅ Preview hanya muncul di slide terakhir
      if (n === fieldsets.length - 1) updatePreview();
    }

    function validateStep(stepIndex) {
      let valid = true;
      let inputs = fieldsets[stepIndex].querySelectorAll("input, select, textarea");
      inputs.forEach(input => {
        let err = input.nextElementSibling;
        if (err && err.classList.contains("error-message")) err.remove();
        if (input.hasAttribute("required") && !input.value) {
          input.classList.add("error");
          let span = document.createElement("div");
          span.className = "error-message";
          span.innerText = "Wajib diisi.";
          input.insertAdjacentElement("afterend", span);
          valid = false;
        } else input.classList.remove("error");
      });
      return valid;
    }

    function nextStep() {
      if (validateStep(currentStep)) {
        if (currentStep < fieldsets.length - 1) {
          currentStep++;
          showStep(currentStep);
        }
      }
    }

    function prevStep() {
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      }
    }

    form.addEventListener("submit", function(e){
      e.preventDefault();
      if (!validateStep(currentStep)) return;
      alert("✅ Pendaftaran berhasil dikirim!");
    });

function updatePreview() {
  let data = new FormData(form);

  let html = `
    <div class="preview-section">
      <h4>Data Pribadi</h4>
      <p><strong>Nama Lengkap:</strong> ${data.get("nama") || "-"}</p>
      <p><strong>Jenis Kelamin:</strong> ${data.get("gender") || "-"}</p>
      <p><strong>Tempat & Tanggal Lahir:</strong> ${data.get("ttl") || "-"}</p>
      <p><strong>NIK:</strong> ${data.get("nik") || "-"}</p>
      <p><strong>Alamat:</strong> ${data.get("alamat") || "-"}</p>
      <p><strong>No HP:</strong> ${data.get("hp") || "-"}</p>
      <p><strong>Email:</strong> ${data.get("email") || "-"}</p>
      <p><strong>Agama:</strong> ${data.get("agama") || "-"}</p>
      <p><strong>Golongan Darah:</strong> ${data.get("goldar") || "-"}</p>
      <p><strong>Status:</strong> ${data.get("status") || "-"}</p>
    </div>

    <div class="preview-section">
      <h4>Data Pendidikan</h4>
      <p><strong>Asal Sekolah:</strong> ${data.get("asal_sekolah") || "-"}</p>
      <p><strong>Tahun Lulus:</strong> ${data.get("tahun_lulus") || "-"}</p>
      <p><strong>Jurusan:</strong> ${data.get("jurusan") || "-"}</p>
      <p><strong>No Ijazah:</strong> ${data.get("no_ijazah") || "-"}</p>
      <p><strong>Nilai Rata-rata:</strong> ${data.get("nilai") || "-"}</p>
    </div>

    <div class="preview-section">
      <h4>Data Orang Tua</h4>
      <p><strong>Nama Ayah:</strong> ${data.get("ayah") || "-"}</p>
      <p><strong>Pekerjaan Ayah:</strong> ${data.get("pekerjaan_ayah") || "-"}</p>
      <p><strong>Pendidikan Ayah:</strong> ${data.get("pendidikan_ayah") || "-"}</p>
      <p><strong>Nama Ibu:</strong> ${data.get("ibu") || "-"}</p>
      <p><strong>Pekerjaan Ibu:</strong> ${data.get("pekerjaan_ibu") || "-"}</p>
      <p><strong>Pendidikan Ibu:</strong> ${data.get("pendidikan_ibu") || "-"}</p>
      <p><strong>Alamat Ortu:</strong> ${data.get("alamat_ortu") || "-"}</p>
      <p><strong>No HP Ortu:</strong> ${data.get("hp_ortu") || "-"}</p>
      <p><strong>Penghasilan:</strong> ${data.get("penghasilan") || "-"}</p>
      <p><strong>Nama Wali:</strong> ${data.get("wali") || "-"}</p>
    </div>

    <div class="preview-section">
      <h4>Data Pendaftaran</h4>
      <p><strong>Prodi 1:</strong> ${data.get("prodi1") || "-"}</p>
      <p><strong>Prodi 2:</strong> ${data.get("prodi2") || "-"}</p>
      <p><strong>Jalur:</strong> ${data.get("jalur") || "-"}</p>
      <p><strong>No Pendaftaran:</strong> ${data.get("no_pendaftaran") || "-"}</p>
    </div>

    <div class="preview-section">
      <h4>Data Tambahan</h4>
      <p><strong>Prestasi:</strong> ${data.get("prestasi") || "-"}</p>
      <p><strong>Kesehatan:</strong> ${data.get("kesehatan") || "-"}</p>
      <p><strong>Hobi:</strong> ${data.get("hobi") || "-"}</p>
    </div>
  `;

  previewContent.innerHTML = html;
}
    showStep(currentStep);