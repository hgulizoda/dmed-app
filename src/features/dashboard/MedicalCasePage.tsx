'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Patient } from '@/types';
import { useToast } from '@/shared/hooks/useToast';
import type { DiagnosisRow } from '@/types';

const TEMPLATES = [
  "Vertebrogen bel umurtqalari radikuiopatiyasi",
  "tibbiy ko'rik bolalar",
  "umurtqa pog'onasi qiyshiqligi",
  "Glomerulonefrit",
  "Gaymorit",
  "ПЛЕВРИТ",
  "Pnevmonya",
  "sur.tonzillit",
];

const DIAGNOSES = [
  "Z99.9: Зависимость от поддерживающих жизнедеятельность механизмов и устройств неуточненных",
  "Z99.8: Зависимость от других вспомогательных механизмов и устройств",
  "Z99.4: Зависимость от искусственного сердца",
  "Z99.3: Зависимость от кресла на колесах",
  "Z99.2: Зависимость от почечного диализа",
  "Z99.1: Зависимость от респиратора",
  "Z99.0: Зависимость от аспиратора",
  "Z00.0: Общий медицинский осмотр",
  "J06.9: Острая инфекция верхних дыхательных путей",
  "I10: Эссенциальная гипертензия",
];

export function MedicalCasePage({ patient }: { patient: Patient }) {
  const router = useRouter();
  const { show } = useToast();
  const [templateInput, setTemplateInput] = useState('');
  const [templateOpen, setTemplateOpen] = useState(false);
  const [diagnosisInput, setDiagnosisInput] = useState('');
  const [diagnosisOpen, setDiagnosisOpen] = useState(false);
  const [diagnoses, setDiagnoses] = useState<DiagnosisRow[]>([]);
  const [clinicalDiagnosis, setClinicalDiagnosis] = useState('');
  const [diagnosisType1, setDiagnosisType1] = useState('');
  const [diagnosisType2, setDiagnosisType2] = useState('');
  const [diseaseNature, setDiseaseNature] = useState('');
  const [collapsibleOpen, setCollapsibleOpen] = useState(false);
  const templateRef = useRef<HTMLDivElement>(null);
  const diagnosisRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (templateRef.current && !templateRef.current.contains(e.target as Node)) setTemplateOpen(false);
      if (diagnosisRef.current && !diagnosisRef.current.contains(e.target as Node)) setDiagnosisOpen(false);
    };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  const filteredTemplates = TEMPLATES.filter((t) =>
    t.toLowerCase().includes(templateInput.toLowerCase())
  );
  const filteredDiagnoses = DIAGNOSES.filter((d) =>
    d.toLowerCase().includes(diagnosisInput.toLowerCase())
  );

  const addDiagnosis = () => {
    if (!diagnosisInput.trim()) {
      show('Выберите диагноз', 'error');
      return;
    }
    setDiagnoses((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        diagnosis: diagnosisInput,
        typeDiagnosis: diagnosisType1 || diagnosisType2 ? [diagnosisType1, diagnosisType2].filter(Boolean).join(' ') : '-',
        diseaseNature: diseaseNature || '-',
        clinicalDiagnosis: clinicalDiagnosis || '-',
      },
    ]);
    setDiagnosisInput('');
    setDiagnosisType1('');
    setDiagnosisType2('');
    setDiseaseNature('');
    setClinicalDiagnosis('');
    show('Диагноз добавлен', 'success');
  };

  const removeDiagnosis = (id: string) => {
    setDiagnoses((prev) => prev.filter((d) => d.id !== id));
  };

  const completeExamination = () => {
    show('Осмотр завершен!', 'success');
    setTimeout(() => router.push('/'), 1500);
  };

  return (
    <div className="page active">
      <div className="breadcrumb">
        <Link href={`/patients/${patient.cardNumber}`}>
          <i className="fas fa-chevron-left" /> Приемы
        </Link>
        <span>/</span>
        <span>{patient.fullName}</span>
        <span>/</span>
        <span className="current">ko&apos;rik</span>
      </div>

      <div className="episode-selector">
        <label className="required-label">Эпизод обращения</label>
        <div className="custom-select-wrapper">
          <select className="form-select" defaultValue="korik">
            <option value="korik">ko&apos;rik</option>
          </select>
        </div>
      </div>

      <div className="visit-history-list">
        <div className="visit-item current">
          <span className="visit-number">1.</span>
          <span className="doctor-name-link">TURAYEVA GULBAXOR KUCHKAROVNA</span>
          <span className="visit-badge">На приеме</span>
        </div>
        <div className="visit-item">
          <span className="visit-number">2.</span>
          <a href="#" className="link-primary" onClick={(e) => e.preventDefault()}>Все диагнозы</a>
        </div>
        <div className="visit-item">
          <span className="visit-number">3.</span>
          <a href="#" className="link-primary" onClick={(e) => e.preventDefault()}>SOBIROVA SAYYORA BEGMUROD QIZI</a>
          <span className="doctor-role">(Практикующая Медсестра)</span>
          <span className="visit-date">04.02.2026 | 10:42</span>
        </div>
      </div>

      <div className="referral-info-grid">
        <div className="info-row"><label>Кто направил</label><span>SOBIROVA SAYYORA BEGMUROD QIZI</span></div>
        <div className="info-row"><label>Дата</label><span>04.02.2026</span></div>
      </div>
      <div className="referral-info-grid">
        <div className="info-row"><label>Место приема</label><span>Клиника</span></div>
        <div className="info-row"><label>Причина вызова</label><span>-</span></div>
      </div>

      <div className="form-grid-3">
        <div className="form-group">
          <label className="required-label">Дата</label>
          <div className="date-input">
            <i className="fas fa-calendar" />
            <input type="text" defaultValue="04.02.2026" />
          </div>
        </div>
        <div className="form-group" ref={templateRef}>
          <label className="required-label">Выбрать шаблон</label>
          <div className="searchable-select">
            <div className="select-input" onClick={() => setTemplateOpen(!templateOpen)}>
              <i className="fas fa-search" />
              <input
                type="text"
                placeholder="Пожалуйста, введите"
                value={templateInput}
                onChange={(e) => { setTemplateInput(e.target.value); setTemplateOpen(true); }}
              />
            </div>
            {templateOpen && (
              <div className="dropdown-list show">
                {filteredTemplates.map((t) => (
                  <div
                    key={t}
                    className="dropdown-item"
                    onClick={() => { setTemplateInput(t); setTemplateOpen(false); }}
                  >
                    {t}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="form-group">
          <label className="required-label">Причина обращения</label>
          <select className="form-select">
            <option value="">Пожалуйста, выберите</option>
            <option value="prof">Проф осмотр</option>
            <option value="disease">По заболеванию</option>
          </select>
        </div>
      </div>

      <div className="rich-text-editor">
        <div className="editor-toolbar">
          <span>File</span><span>Edit</span><span>View</span><span>Insert</span><span>Format</span><span>Tools</span><span>Table</span><span>Help</span>
        </div>
        <div className="editor-buttons">
          <button type="button"><i className="fas fa-undo" /></button>
          <button type="button"><i className="fas fa-redo" /></button>
          <button type="button"><b>B</b></button>
          <button type="button"><i>I</i></button>
          <button type="button"><i className="fas fa-highlighter" /></button>
          <button type="button"><i className="fas fa-align-left" /></button>
          <button type="button"><i className="fas fa-align-center" /></button>
          <button type="button"><i className="fas fa-align-right" /></button>
          <button type="button"><i className="fas fa-align-justify" /></button>
          <button type="button"><i className="fas fa-list-ul" /></button>
          <button type="button"><i className="fas fa-list-ol" /></button>
          <button type="button"><i className="fas fa-outdent" /></button>
          <button type="button"><i className="fas fa-indent" /></button>
          <button type="button"><i className="fas fa-subscript" /></button>
          <button type="button"><i className="fas fa-flag" /></button>
          <button type="button"><i className="fas fa-print" /></button>
          <button type="button"><i className="fas fa-question-circle" /></button>
        </div>
        <div className="editor-content" contentEditable suppressContentEditableWarning />
        <div className="editor-hint">Press ⌃0 for help</div>
      </div>

      <div className="form-section">
        <label>Рекомендации <i className="fas fa-copy copy-btn" /> <i className="fas fa-clipboard copy-btn" /></label>
        <textarea className="form-textarea" rows={4} />
      </div>
      <div className="form-section">
        <label>Заключение <i className="fas fa-copy copy-btn" /></label>
        <textarea className="form-textarea" rows={2} placeholder="Пожалуйста, введите" />
      </div>

      <div className="section-with-action">
        <h3>Файлы</h3>
        <button type="button" className="btn-outline-small" onClick={() => show('Добавить файл (мок)', 'info')}>
          Добавить файл
        </button>
      </div>

      <div className="collapsible-section">
        <div
          className={`section-header-collapsible ${collapsibleOpen ? 'open' : ''}`}
          onClick={() => setCollapsibleOpen(!collapsibleOpen)}
          onKeyDown={(e) => e.key === 'Enter' && setCollapsibleOpen(!collapsibleOpen)}
          role="button"
          tabIndex={0}
        >
          <span>Д-учет</span>
          <i className="fas fa-chevron-right" />
        </div>
      </div>

      <div className="diagnosis-section">
        <h3>Диагнозы в эпизоде (МКБ-10)</h3>
        <div className="diagnosis-form">
          <div className="form-row-4">
            <div className="form-group" ref={diagnosisRef}>
              <div className="searchable-select">
                <div className="select-input" onClick={() => setDiagnosisOpen(!diagnosisOpen)}>
                  <i className="fas fa-search" />
                  <input
                    type="text"
                    placeholder="Выберите диагноз"
                    value={diagnosisInput}
                    onChange={(e) => { setDiagnosisInput(e.target.value); setDiagnosisOpen(true); }}
                  />
                </div>
                {diagnosisOpen && (
                  <div className="dropdown-list show">
                    {filteredDiagnoses.map((d) => (
                      <div
                        key={d}
                        className="dropdown-item"
                        onClick={() => { setDiagnosisInput(d); setDiagnosisOpen(false); }}
                      >
                        {d}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="form-group">
              <select className="form-select" value={diagnosisType1} onChange={(e) => setDiagnosisType1(e.target.value)}>
                <option value="">Выберите тип</option>
                <option value="preliminary">Предварительный диагноз</option>
                <option value="final">Окончательный диагноз</option>
              </select>
            </div>
            <div className="form-group">
              <select className="form-select" value={diagnosisType2} onChange={(e) => setDiagnosisType2(e.target.value)}>
                <option value="">Выберите тип</option>
                <option value="main">Основной</option>
                <option value="concomitant">Сопутствующий</option>
                <option value="complication">Осложнение</option>
                <option value="background">Фоновый</option>
                <option value="competing">Конкурирующий</option>
              </select>
            </div>
            <div className="form-group">
              <select className="form-select" value={diseaseNature} onChange={(e) => setDiseaseNature(e.target.value)}>
                <option value="">Характер заболевания</option>
                <option value="acute">Острое</option>
                <option value="chronic">Хроническое</option>
                <option value="firstDetected">Впервые выявленное</option>
              </select>
            </div>
          </div>
          <div className="form-row-with-button">
            <div className="form-group flex-1">
              <textarea
                className="form-textarea"
                placeholder="Клинический диагноз (необязательно)"
                value={clinicalDiagnosis}
                onChange={(e) => setClinicalDiagnosis(e.target.value.slice(0, 1000))}
              />
              <span className="char-count">{clinicalDiagnosis.length} / 1000</span>
            </div>
            <button type="button" className="btn-outline" onClick={addDiagnosis}>
              Добавить диагноз
            </button>
          </div>
        </div>

        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>Диагнозы</th>
                <th>Тип диагноза</th>
                <th>Характер заболевания</th>
                <th>Кл. диагноз</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {diagnoses.length === 0 ? (
                <tr className="empty-row">
                  <td colSpan={5} className="no-data">Нет данных</td>
                </tr>
              ) : (
                diagnoses.map((d) => (
                  <tr key={d.id}>
                    <td>{d.diagnosis}</td>
                    <td>{d.typeDiagnosis}</td>
                    <td>{d.diseaseNature}</td>
                    <td>{d.clinicalDiagnosis}</td>
                    <td>
                      <button type="button" className="btn-action-delete" onClick={() => removeDiagnosis(d.id)}>
                        Удалить
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="section-with-action">
        <h3>Амбулаторная операция</h3>
        <button type="button" className="btn-outline-small" onClick={() => show('Добавить (мок)', 'info')}>Добавить</button>
      </div>
      <div className="data-table">
        <table>
          <thead>
            <tr><th>Врач</th><th>Процедур</th><th>Дата создания</th><th>Действия</th></tr>
          </thead>
          <tbody>
            <tr><td colSpan={4} className="no-data">Нет данных</td></tr>
          </tbody>
        </table>
      </div>

      <div className="section-with-action">
        <h3>Заседание ВКК</h3>
        <button type="button" className="btn-outline-small" onClick={() => show('Добавить (мок)', 'info')}>Добавить</button>
      </div>
      <div className="data-table">
        <table>
          <thead>
            <tr><th>Врач</th><th>Тип заключения</th><th>Дата создания</th><th>Действия</th></tr>
          </thead>
          <tbody>
            <tr><td colSpan={4} className="no-data">Нет данных</td></tr>
          </tbody>
        </table>
      </div>

      <div className="quick-actions">
        <button type="button" className="btn-cancel" onClick={() => show('Приём отменён (мок)', 'info')}>Отменить приём</button>
        <button type="button" className="btn-outline" onClick={() => show('Рецепт (мок)', 'info')}>+ Рецепт</button>
        <button type="button" className="btn-outline" onClick={() => show('Документ (мок)', 'info')}>+ Документ</button>
        <button type="button" className="btn-outline" onClick={() => show('Анализы (мок)', 'info')}>+ Анализы</button>
        <button type="button" className="btn-outline" onClick={() => show('Назначения (мок)', 'info')}>+ Назначения</button>
        <button type="button" className="btn-outline" onClick={() => show('Госпитализация (мок)', 'info')}>+ Госпитализация</button>
        <button type="button" className="btn-outline" onClick={() => show('Курс лечения (мок)', 'info')}>+ Курс лечения</button>
      </div>
      <div className="quick-actions secondary">
        <button type="button" className="btn-outline" onClick={() => show('Изменить учеты (мок)', 'info')}>Изменить учеты</button>
        <button type="button" className="btn-outline" onClick={() => show('Вакцинация (мок)', 'info')}>+ Вакцинация</button>
        <button type="button" className="btn-outline" onClick={() => show('Печать (мок)', 'info')}>Распечатать</button>
        <button type="button" className="btn-primary" onClick={completeExamination}>Завершить осмотр</button>
      </div>
    </div>
  );
}
