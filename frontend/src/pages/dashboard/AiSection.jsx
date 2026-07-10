import { FiZap, FiCpu, FiDatabase, FiUsers, FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { SiPython } from "react-icons/si";
import { Section, Card, ExternalLink, PrerequisitesBanner, sub } from "./shared";

const ragArchitectures = [
  { name: "Naive RAG", desc: "Simple retrieve → augment → generate. Query → embed → top-k chunks → LLM. Baseline for all RAG systems." },
  { name: "Advanced RAG (Hybrid)", desc: "Dense (embedding) + sparse (BM25) retrieval with reciprocal rank fusion. Handles keyword + semantic search." },
  { name: "Multi-Hop RAG", desc: "Iterative retrieval: answer one hop, use result to query the next. For complex questions needing multiple sources." },
  { name: "Agentic RAG", desc: "LLM decides when and what to retrieve. Tool-calling agents with query rewriting, routing, and self-correction." },
  { name: "Graph RAG", desc: "Build a knowledge graph from documents. Traverse entities and relationships for structured, multi-relational queries." },
  { name: "Self-RAG", desc: "LLM generates then reflects: retrieves only when needed, critiques its own output, cites sources. Improves factuality." },
  { name: "Corrective RAG (CRAG)", desc: "Retrieve → evaluate relevance → if low, rewrite query or web search → re-retrieve → generate." },
  { name: "Speculative RAG", desc: "Generate multiple draft answers in parallel from different document subsets, then select/vote on best." },
  { name: "Multi-Modal RAG", desc: "Retrieve images, tables, audio, video alongside text. Embed all modalities into shared vector space." },
  { name: "Streaming RAG", desc: "Stream tokens as they're generated while retrieving additional context in parallel. Low-latency real-time pipelines." },
];

const aiTopics = [
  {
    title: "LLMs & API Integration",
    icon: FiZap, color: "text-yellow-500",
    items: ["GPT-4o, Claude 3.5, Gemini 1.5, Llama 3, Mistral — API patterns", "Function calling, structured outputs, JSON mode", "Streaming: SSE, Vercel AI SDK, LangChain streaming", "Context windows, token counting, cost optimization", "System prompts, personas, guardrails, safety filters"],
  },
  {
    title: "AI Agents (Beginner → Advanced)",
    icon: FiCpu, color: "text-purple-500",
    items: ["LangGraph: state graphs, cycles, checkpointing, human-in-loop", "CrewAI: role-based teams, tasks, tools, delegation", "AutoGen: multi-agent conversation, code exec, tools", "Swarm: lightweight OpenAI multi-agent orchestration", "Agent memory: short-term, long-term, semantic, episodic"],
  },
  {
    title: "RAG Pipelines (8+ Architectures Above)",
    icon: FiDatabase, color: "text-blue-500",
    items: ["Embedding models: text-embedding-3-small, BGE, E5, Instructor", "Vector DBs: Pinecone, Weaviate, Qdrant, Chroma, pgvector", "Chunking: recursive, semantic, agentic, sentence-window, LLM-based", "Hybrid search: dense + sparse + re-ranking (Cohere, BGE-Reranker)", "Evaluation: RAGAS, ARES, TruLens, LLM-as-judge"],
  },
  {
    title: "Fine-Tuning & MLOps",
    icon: SiPython, color: "text-green-500",
    items: ["LoRA, QLoRA, DoRA, Axolotl, Unsloth (2x training speed)", "Hugging Face: Transformers, PEFT, TRL, datasets, model hub", "MLflow, DVC, W&B — experiment tracking, data versioning", "ONNX, TensorRT, vLLM, TGI — model serving and optimization", "Quantization: GPTQ, AWQ, GGUF, bitsandbytes 4-bit, Flash Attn"],
  },
  {
    title: "Gen AI & Automation",
    icon: FiZap, color: "text-orange-500",
    items: ["Text-to-image: DALL-E 3, Stable Diffusion, Midjourney, Imagen, FLUX", "Text-to-speech: ElevenLabs, OpenAI TTS, Bark, Fish Speech", "Speech-to-text: Whisper, Deepgram, AssemblyAI, Azure STT", "AI automation: n8n, Zapier AI, Make, custom agent workflows, browser automation", "Video generation: Sora, Runway Gen-3, Pika, Kling, Haiper"],
  },
  {
    title: "Gen AI Design & HITL (Human-in-the-Loop)",
    icon: FiUsers, color: "text-rose-500",
    items: ["LLM app architecture: input → guardrails → context building → prompt → LLM → output validation → response", "HITL patterns: approval gates before destructive actions, escalation to human for edge cases", "Feedback loops: human feedback → preference tuning (RLHF, DPO) → improved model", "Evaluation-driven dev: unit tests for prompts, regression benchmark suite, LLM-as-judge", "Prompt management: version control, A/B testing, prompt templates, registry, monitoring"],
  },
];

const hitlPatterns = [
  { name: "Approval Gate", desc: "Agent pauses before destructive actions (delete, write, pay) and waits for human confirmation. Critical for production safety." },
  { name: "Escalation", desc: "When agent confidence is low or input is ambiguous, escalate to human. Agent provides context and suggested actions." },
  { name: "Human-in-the-Loop Training", desc: "Human provides feedback on model outputs → preference pairs → RLHF/DPO fine-tuning → improved behavior." },
  { name: "Human-on-the-Loop", desc: "Human monitors autonomously running agents with ability to intervene. Agent runs unless human stops it." },
  { name: "Feedback Loop", desc: "Post-execution human feedback (thumbs up/down, rating, correction) stored and used for continuous improvement." },
  { name: "Handoff Protocol", desc: "Structured handoff between agent and human: context summary, options, recommendation, human decision, continuation." },
];

const genAiDesignTopics = [
  {
    title: "LLM Application Architecture", color: "text-blue-500",
    items: ["Input processing: guardrails, PII redaction, input validation, safety classification", "Context building: retrieve, summarize, chunk, filter, rank for prompt window", "Prompt assembly: system prompt, examples, context, query, output format", "LLM call: model selection, temperature, max tokens, tools, streaming", "Output validation: JSON parse, schema check, content safety, citation check", "Response delivery: stream, cache, log, monitor latency, cost tracking"],
  },
  {
    title: "Prompt Engineering Patterns", color: "text-yellow-500",
    items: ["Chain-of-thought: step-by-step reasoning with intermediate outputs", "Few-shot: examples in context with format specification and edge cases", "Structured output: JSON mode, function calling, Pydantic/TypedDict validation", "System prompts: persona, constraints, rules, safety guardrails, formatting", "Meta-prompting: LLM generates and refines its own prompts", "Automated prompt optimization: DSPy, PromptPerfect, OPRO"],
  },
  {
    title: "Evaluation & Monitoring", color: "text-green-500",
    items: ["Offline eval: BLEU, ROUGE, METEOR, BERTScore, Perplexity, RAGAS", "Online eval: A/B testing, shadow mode, canary deploy, user feedback", "LLM-as-judge: GPT-4/Claude evaluates outputs — criteria, rubrics, calibration", "Monitoring: LangSmith, Weights & Biases, Helicone, LangFuse, Arize", "Regression testing: benchmark datasets, automated eval suite, CI integration", "Cost & latency: token tracking, model switching, caching, batching"],
  },
  {
    title: "Safety & Guardrails", color: "text-red-500",
    items: ["Input guardrails: topic restriction, jailbreak detection, prompt injection protection", "Output guardrails: content filter, factuality check, citation requirement", "NeMo Guardrails: colang, rails, actions, user/massage flow configuration", "Guardrails AI: validators, reasks, fix logic, on_fail behaviors", "Content moderation: OpenAI Moderation, Azure Content Safety, custom classifiers", "Red teaming: automated adversarial testing, boundary probing, continuous eval"],
  },
];

const RagDiagram = () => (
  <Card title="RAG Pipeline Architecture" className="mb-6">
    <svg viewBox="0 0 860 240" className="w-full h-auto max-w-4xl mx-auto" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="ragArrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#eab308" /></marker>
        <filter id="ragShadow"><feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" /></filter>
      </defs>
      <rect x="20" y="80" width="100" height="70" rx="8" fill="white" stroke="#3b82f6" strokeWidth="1.5" filter="url(#ragShadow)" />
      <text x="70" y="108" textAnchor="middle" fill="#1e40af" fontSize="12" fontWeight="bold">User Query</text>
      <text x="70" y="126" textAnchor="middle" fill="#666" fontSize="9">raw input</text>
      <line x1="120" y1="115" x2="160" y2="115" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#ragArrow)" />
      <rect x="165" y="80" width="110" height="70" rx="8" fill="#fef3c7" stroke="#eab308" strokeWidth="1.5" filter="url(#ragShadow)" />
      <text x="220" y="105" textAnchor="middle" fill="#92400e" fontSize="11" fontWeight="bold">Query Processing</text>
      <text x="220" y="120" textAnchor="middle" fill="#92400e" fontSize="9">rewrite / expansion</text>
      <text x="220" y="135" textAnchor="middle" fill="#92400e" fontSize="9">intent classification</text>
      <line x1="275" y1="95" x2="315" y2="75" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#ragArrow)" />
      <line x1="275" y1="135" x2="315" y2="155" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#ragArrow)" />
      <rect x="320" y="40" width="100" height="70" rx="8" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5" filter="url(#ragShadow)" />
      <text x="370" y="68" textAnchor="middle" fill="#166534" fontSize="11" fontWeight="bold">Dense Retrieval</text>
      <text x="370" y="83" textAnchor="middle" fill="#166534" fontSize="9">embedding + ANN</text>
      <text x="370" y="98" textAnchor="middle" fill="#166534" fontSize="9">top-k chunks</text>
      <rect x="320" y="120" width="100" height="70" rx="8" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5" filter="url(#ragShadow)" />
      <text x="370" y="148" textAnchor="middle" fill="#166534" fontSize="11" fontWeight="bold">Sparse Retrieval</text>
      <text x="370" y="163" textAnchor="middle" fill="#166534" fontSize="9">BM25 / SPLADE</text>
      <text x="370" y="178" textAnchor="middle" fill="#166534" fontSize="9">keyword match</text>
      <line x1="420" y1="75" x2="460" y2="115" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#ragArrow)" />
      <line x1="420" y1="155" x2="460" y2="115" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#ragArrow)" />
      <rect x="465" y="80" width="90" height="70" rx="8" fill="#fef3c7" stroke="#eab308" strokeWidth="1.5" filter="url(#ragShadow)" />
      <text x="510" y="105" textAnchor="middle" fill="#92400e" fontSize="11" fontWeight="bold">Fusion</text>
      <text x="510" y="120" textAnchor="middle" fill="#92400e" fontSize="9">RRF / re-rank</text>
      <text x="510" y="135" textAnchor="middle" fill="#92400e" fontSize="9">Cohere / BGE</text>
      <line x1="555" y1="115" x2="595" y2="115" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#ragArrow)" />
      <rect x="600" y="80" width="100" height="70" rx="8" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" filter="url(#ragShadow)" />
      <text x="650" y="105" textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="bold">LLM Generation</text>
      <text x="650" y="120" textAnchor="middle" fill="#1e40af" fontSize="9">context + query</text>
      <text x="650" y="135" textAnchor="middle" fill="#1e40af" fontSize="9">→ answer</text>
      <line x1="700" y1="115" x2="740" y2="115" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#ragArrow)" />
      <rect x="745" y="80" width="90" height="70" rx="8" fill="white" stroke="#22c55e" strokeWidth="1.5" filter="url(#ragShadow)" />
      <text x="790" y="108" textAnchor="middle" fill="#166534" fontSize="12" fontWeight="bold">Response</text>
      <text x="790" y="126" textAnchor="middle" fill="#666" fontSize="9">cited answer</text>
      <text x="10" y="30" fill="#999" fontSize="10">Pipeline: Query → Retrieve (Dense + Sparse) → Fuse → Generate → Respond</text>
    </svg>
  </Card>
);

const AgentDiagram = () => (
  <Card title="Agent Architecture with HITL" className="mb-6">
    <svg viewBox="0 0 860 300" className="w-full h-auto max-w-4xl mx-auto" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="agtArrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#eab308" /></marker>
        <filter id="agtShadow"><feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" /></filter>
      </defs>
      <rect x="30" y="110" width="110" height="70" rx="10" fill="white" stroke="#3b82f6" strokeWidth="1.5" filter="url(#agtShadow)" />
      <text x="85" y="140" textAnchor="middle" fill="#1e40af" fontSize="12" fontWeight="bold">User Input</text>
      <text x="85" y="157" textAnchor="middle" fill="#666" fontSize="9">query / task</text>
      <line x1="140" y1="145" x2="190" y2="145" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#agtArrow)" />
      <rect x="195" y="20" width="130" height="80" rx="10" fill="#fef3c7" stroke="#eab308" strokeWidth="1.5" filter="url(#agtShadow)" />
      <text x="260" y="48" textAnchor="middle" fill="#92400e" fontSize="11" fontWeight="bold">Planner / Router</text>
      <text x="260" y="63" textAnchor="middle" fill="#92400e" fontSize="9">decompose task</text>
      <text x="260" y="78" textAnchor="middle" fill="#92400e" fontSize="9">select tools</text>
      <line x1="260" y1="100" x2="260" y2="145" stroke="#eab308" strokeWidth="1" strokeDasharray="4,3" />
      <rect x="195" y="150" width="130" height="60" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" filter="url(#agtShadow)" />
      <text x="260" y="175" textAnchor="middle" fill="#92400e" fontSize="9" fontWeight="bold">Memory</text>
      <text x="260" y="190" textAnchor="middle" fill="#92400e" fontSize="9">short/long/semantic</text>
      <line x1="325" y1="60" x2="385" y2="60" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#agtArrow)" />
      <line x1="325" y1="145" x2="385" y2="145" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#agtArrow)" />
      <rect x="390" y="25" width="120" height="70" rx="8" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5" filter="url(#agtShadow)" />
      <text x="450" y="52" textAnchor="middle" fill="#166534" fontSize="11" fontWeight="bold">Tool: Search</text>
      <text x="450" y="67" textAnchor="middle" fill="#166534" fontSize="9">web / DB / API</text>
      <line x1="390" y1="90" x2="390" y2="130" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#agtArrow)" />
      <rect x="390" y="135" width="120" height="70" rx="8" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5" filter="url(#agtShadow)" />
      <text x="450" y="162" textAnchor="middle" fill="#166534" fontSize="11" fontWeight="bold">Tool: Code Exec</text>
      <text x="450" y="177" textAnchor="middle" fill="#166534" fontSize="9">Python / sandbox</text>
      <line x1="510" y1="60" x2="560" y2="60" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#agtArrow)" />
      <line x1="510" y1="170" x2="560" y2="170" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#agtArrow)" />
      <rect x="565" y="25" width="120" height="70" rx="8" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5" filter="url(#agtShadow)" />
      <text x="625" y="52" textAnchor="middle" fill="#166534" fontSize="11" fontWeight="bold">Tool: File I/O</text>
      <text x="625" y="67" textAnchor="middle" fill="#166534" fontSize="9">read / write / parse</text>
      <line x1="565" y1="90" x2="565" y2="130" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#agtArrow)" />
      <rect x="565" y="135" width="120" height="70" rx="8" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5" filter="url(#agtShadow)" />
      <text x="625" y="162" textAnchor="middle" fill="#166534" fontSize="11" fontWeight="bold">Tool: Image Gen</text>
      <text x="625" y="177" textAnchor="middle" fill="#166534" fontSize="9">DALL-E / SD / Flux</text>
      <line x1="685" y1="60" x2="725" y2="60" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#agtArrow)" />
      <line x1="685" y1="170" x2="725" y2="170" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#agtArrow)" />
      <rect x="730" y="85" width="100" height="80" rx="10" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5" filter="url(#agtShadow)" />
      <text x="780" y="115" textAnchor="middle" fill="#991b1b" fontSize="11" fontWeight="bold">HITL Gate</text>
      <text x="780" y="130" textAnchor="middle" fill="#991b1b" fontSize="9">approval</text>
      <text x="780" y="145" textAnchor="middle" fill="#991b1b" fontSize="9">required</text>
      <line x1="780" y1="85" x2="780" y2="50" stroke="#ef4444" strokeWidth="1" strokeDasharray="4,3" />
      <rect x="730" y="10" width="100" height="35" rx="6" fill="white" stroke="#dc2626" strokeWidth="1" />
      <text x="780" y="32" textAnchor="middle" fill="#dc2626" fontSize="9" fontWeight="bold">Human Review</text>
      <path d="M780,165 L780,200 L85,200 L85,180" stroke="#eab308" strokeWidth="1" fill="none" markerEnd="url(#agtArrow)" strokeDasharray="4,3" />
      <text x="430" y="215" textAnchor="middle" fill="#999" fontSize="9">loop back to planner for next step</text>
      <text x="10" y="280" fill="#999" fontSize="10">Agent Loop: Input → Plan → Execute Tools → HITL Gate → Result → Loop</text>
    </svg>
  </Card>
);

const AiSection = () => (
  <Section title="AI Engineering & Agents" desc="LLMs, 10 RAG architectures, agents, fine-tuning, MLOps, Gen AI design, HITL, safety — complete 2026 curriculum.">
    <PrerequisitesBanner />

    <h4 className="text-xl font-bold mb-3 text-yellow-700 dark:text-yellow-400">10 RAG Architectures</h4>
    <div className="grid sm:grid-cols-2 gap-3 mb-6">
      {ragArchitectures.map(({ name, desc }) => (
        <Card key={name} className="border-l-4 border-yellow-400">
          <h5 className="font-bold text-base text-yellow-700 dark:text-yellow-400">{name}</h5>
          {sub(desc)}
        </Card>
      ))}
    </div>

    <RagDiagram />

    <h4 className="text-xl font-bold mb-3 text-purple-700 dark:text-purple-400">Core AI Topics</h4>
    <div className="grid sm:grid-cols-2 gap-4 mb-8">
      {aiTopics.map(({ title, icon: Icon, color, items }) => (
        <Card key={title}>
          <div className="flex items-center gap-2 mb-2">
            <Icon size={20} className={color} />
            <h4 className={`font-bold text-lg ${color}`}>{title}</h4>
          </div>
          <ul className="space-y-1.5">
            {items.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-base text-gray-800 dark:text-gray-200 font-medium">
                <FiArrowRight size={14} className={`${color} shrink-0 mt-1`} />
                {item}
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>

    <AgentDiagram />

    <h4 className="text-xl font-bold mb-3 text-rose-700 dark:text-rose-400">Gen AI Design & HITL Patterns</h4>
    <div className="grid sm:grid-cols-2 gap-4 mb-6">
      {genAiDesignTopics.map(({ title, color, items }) => (
        <Card key={title}>
          <h4 className={`font-bold text-lg mb-2 ${color}`}>{title}</h4>
          <ul className="space-y-1.5">
            {items.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-base text-gray-800 dark:text-gray-200 font-medium">
                <FiCheckCircle size={15} className="text-green-500 shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>

    <h4 className="text-lg font-bold mb-3 text-red-700 dark:text-red-400">Human-in-the-Loop Patterns</h4>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
      {hitlPatterns.map(({ name, desc }) => (
        <Card key={name} className="border-l-4 border-red-400">
          <h5 className="font-bold text-base text-red-700 dark:text-red-400">{name}</h5>
          {sub(desc)}
        </Card>
      ))}
    </div>

    <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <ExternalLink href="https://platform.openai.com/docs/" label="OpenAI API" desc="GPT-4o, embeddings, assistants, vision" />
      <ExternalLink href="https://docs.anthropic.com/" label="Claude API" desc="Tool use, computer use, prompt caching" />
      <ExternalLink href="https://js.langchain.com/docs/" label="LangChain.js" desc="Chains, agents, retrievers, RAG" />
      <ExternalLink href="https://python.langchain.com/docs/langgraph" label="LangGraph" desc="Stateful agent graphs, HITL" />
      <ExternalLink href="https://huggingface.co/docs" label="Hugging Face" desc="Transformers, PEFT, TRL, datasets" />
      <ExternalLink href="https://python.langchain.com/docs/integrations/vectorstores/" label="Vector DBs" desc="Pinecone, Weaviate, Qdrant, Chroma" />
      <ExternalLink href="https://pytorch.org/docs/" label="PyTorch" desc="Tensors, autograd, distributed train" />
      <ExternalLink href="https://www.tensorflow.org/" label="TensorFlow" desc="Keras, TF Serving, TFLite, JAX" />
      <ExternalLink href="https://github.com/NVIDIA/NeMo-Guardrails" label="NeMo Guardrails" desc="Colang, rails, safety guardrails" />
      <ExternalLink href="https://www.guardrailsai.com/docs" label="Guardrails AI" desc="Validators, reasks, structured output" />
      <ExternalLink href="https://docs.smith.langchain.com/" label="LangSmith" desc="Tracing, eval, datasets, monitoring" />
      <ExternalLink href="https://www.arize.com/" label="Arize AI" desc="LLM monitoring, embeddings, drift" />
    </div>
  </Section>
);

export default AiSection;
