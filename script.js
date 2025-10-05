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
        <div class='preview-section'><h4>Data Pribadi</h4><br>
        <strong>Nama Lengkap:</strong> ${data.get("nama") || ""}<br>
        <strong>Jenis Kelamin:</strong> ${data.get("gender") || ""}<br>
        <strong>Tempat & Tanggal Lahir:</strong> ${data.get("ttl") || ""}<br>
        <strong>NIK:</strong> ${data.get("nik") || ""}<br>
        <strong>Alamat:</strong> ${data.get("alamat") || ""}<br>
        <strong>No HP:</strong> ${data.get("hp") || ""}<br>
        <strong>Email:</strong> ${data.get("email") || ""}<br>
        <strong>Agama:</strong> ${data.get("agama") || ""}<br>
        <strong>Golongan Darah:</strong> ${data.get("goldar") || ""}<br>
        <strong>Status:</strong> ${data.get("status") || ""}</div>

        <div class='preview-section'><h4>Data Pendidikan</h4><br>
        <strong>Asal Sekolah:</strong> ${data.get("asal_sekolah") || ""}<br>
        <strong>Tahun Lulus:</strong> ${data.get("tahun_lulus") || ""}<br>
        <strong>Jurusan:</strong> ${data.get("jurusan") || ""}<br>
        <strong>No Ijazah:</strong> ${data.get("no_ijazah") || ""}<br>
        <strong>Nilai Rata-rata:</strong> ${data.get("nilai") || ""}</div>

        <div class='preview-section'><h4>Data Orang Tua</h4><br>
        <strong>Ayah:</strong> ${data.get("ayah") || ""}<br>
        <strong>Pekerjaan Ayah:</strong> ${data.get("pekerjaan_ayah") || ""}<br>
        <strong>Pendidikan Ayah:</strong> ${data.get("pendidikan_ayah") || ""}<br>
        <strong>Ibu:</strong> ${data.get("ibu") || ""}<br>
        <strong>Pekerjaan Ibu:</strong> ${data.get("pekerjaan_ibu") || ""}<br>
        <strong>Pendidikan Ibu:</strong> ${data.get("pendidikan_ibu") || ""}<br>
        <strong>Alamat Ortu:</strong> ${data.get("alamat_ortu") || ""}<br>
        <strong>No HP Ortu:</strong> ${data.get("hp_ortu") || ""}<br>
        <strong>Penghasilan:</strong> ${data.get("penghasilan") || ""}<br>
        <strong>Nama Wali:</strong> ${data.get("wali") || ""}</div>

        <div class='preview-section'><h4>Data Pendaftaran</h4><br>
        <strong>Prodi 1:</strong> ${data.get("prodi1") || ""}<br>
        <strong>Prodi 2:</strong> ${data.get("prodi2") || ""}<br>
        <strong>Jalur:</strong> ${data.get("jalur") || ""}<br>
        <strong>No Pendaftaran:</strong> ${data.get("no_pendaftaran") || ""}</div>

        <div class='preview-section'><h4>Data Tambahan</h4><br>
        <strong>Prestasi:</strong> ${data.get("prestasi") || ""}<br>
        <strong>Kesehatan:</strong> ${data.get("kesehatan") || ""}<br>
        <strong>Hobi:</strong> ${data.get("hobi") || ""}</div>
      `;
      previewContent.innerHTML = html;
    }

    showStep(currentStep);