// Generated from canonical JSON Schemas. Do not edit.

export type RequestClarificationValueV2 =
  EntitySelectionClarificationValueV2 | EntityMultiSelectionClarificationValueV2;
export type OpaqueIdentifier = string;

export interface EntitySelectionClarificationValueV2 {
  kind: 'entity_selection';
  entity_type: string;
  entity_id: OpaqueIdentifier;
  display_text?: string;
}
export interface EntityMultiSelectionClarificationValueV2 {
  kind: 'entity_multi_selection';
  entity_type: string;
  /**
   * @minItems 1
   * @maxItems 10
   */
  entity_ids:
    | [OpaqueIdentifier]
    | [OpaqueIdentifier, OpaqueIdentifier]
    | [OpaqueIdentifier, OpaqueIdentifier, OpaqueIdentifier]
    | [OpaqueIdentifier, OpaqueIdentifier, OpaqueIdentifier, OpaqueIdentifier]
    | [OpaqueIdentifier, OpaqueIdentifier, OpaqueIdentifier, OpaqueIdentifier, OpaqueIdentifier]
    | [
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier
      ]
    | [
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier
      ]
    | [
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier
      ]
    | [
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier
      ]
    | [
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier
      ];
}

/**
 * Contrato general de salida utilizado por Python/LangGraph y .NET. Representa respuestas finales, aclaraciones, confirmaciones, solicitudes de ejecución, correcciones, denegaciones, solicitudes no soportadas y errores.
 */
export type ChatTurnResponseV2 = {
  contract_version: '2.0';
  request_id: OpaqueIdentifier;
  conversation_id: OpaqueIdentifier;
  turn_id: OpaqueIdentifier;
  status:
    | 'completed'
    | 'needs_clarification'
    | 'awaiting_confirmation'
    | 'awaiting_execution'
    | 'needs_correction'
    | 'denied'
    | 'unsupported'
    | 'failed';
  message: string;
  action?:
    | ClarificationAction
    | ConfirmationAction
    | QueryExecutionAction
    | SkillExecutionAction
    | AttachmentProcessingAction
    | AnalyticsExecutionAction;
  result?:
    DataViewResult | ReportDocumentResult | NarrativeResult | OperationSummaryResult | FileResult;
  presentation?:
    | TextPresentation
    | DataGridPresentation
    | ChartPresentation
    | DataGridWithChartPresentation
    | DevexpressReportViewerPresentation
    | OperationResultPresentation;
  /**
   * @maxItems 20
   */
  available_actions?:
    | []
    | [CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction]
    | [
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction
      ]
    | [
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction
      ]
    | [
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction
      ]
    | [
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction
      ]
    | [
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction
      ]
    | [
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction
      ]
    | [
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction
      ]
    | [
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction
      ]
    | [
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction
      ]
    | [
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction
      ]
    | [
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction
      ]
    | [
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction
      ]
    | [
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction
      ]
    | [
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction
      ]
    | [
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction
      ]
    | [
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction
      ]
    | [
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction
      ]
    | [
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction
      ]
    | [
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction,
        CreateSavedReportAvailableAction | ReplaceAttachmentAvailableAction
      ];
  error?: ErrorDetail;
  state_revision?: number;
  diagnostics?: Diagnostics;
};
export type OpaqueIdentifier = string;
export type ClarificationResponseSpec =
  | {
      type: 'text';
      required: boolean;
      allow_free_text?: boolean;
      validation?: JsonObject;
    }
  | EntitySelectionResponseSpec
  | EntityMultiSelectionResponseSpec
  | {
      type: 'single_choice';
      required: boolean;
      allow_free_text?: boolean;
      /**
       * @minItems 1
       */
      options: [ClarificationOption, ...ClarificationOption[]];
    }
  | {
      type: 'multiple_choice';
      required: boolean;
      allow_free_text?: boolean;
      /**
       * @minItems 1
       */
      options: [ClarificationOption, ...ClarificationOption[]];
    }
  | {
      type: 'date';
      required: boolean;
      allow_free_text?: boolean;
      validation?: JsonObject;
    }
  | {
      type: 'date_range';
      required: boolean;
      allow_free_text?: boolean;
      presets?: ClarificationOption[];
      validation?: JsonObject;
    }
  | {
      type: 'number';
      required: boolean;
      allow_free_text?: boolean;
      validation?: JsonObject;
    }
  | {
      type: 'boolean';
      required: boolean;
      default?: boolean;
    };
export type ParameterValue =
  | string
  | number
  | boolean
  | null
  | {
      [k: string]: any;
    }
  | any[];
export type SemanticVersion = string;

export interface ClarificationAction {
  kind: 'clarification';
  clarification_id: OpaqueIdentifier;
  field: string;
  reason_code?: string;
  question: string;
  response_spec: ClarificationResponseSpec;
}
export interface JsonObject {
  [k: string]: any;
}
export interface EntitySelectionResponseSpec {
  type: 'entity_selection';
  required: boolean;
  allow_free_text?: boolean;
  entity: {
    entity_type: string;
    search_owner: 'dotnet';
    minimum_search_length?: number;
  };
  /**
   * @minItems 1
   * @maxItems 10
   */
  options:
    | [ClarificationOption]
    | [ClarificationOption, ClarificationOption]
    | [ClarificationOption, ClarificationOption, ClarificationOption]
    | [ClarificationOption, ClarificationOption, ClarificationOption, ClarificationOption]
    | [
        ClarificationOption,
        ClarificationOption,
        ClarificationOption,
        ClarificationOption,
        ClarificationOption
      ]
    | [
        ClarificationOption,
        ClarificationOption,
        ClarificationOption,
        ClarificationOption,
        ClarificationOption,
        ClarificationOption
      ]
    | [
        ClarificationOption,
        ClarificationOption,
        ClarificationOption,
        ClarificationOption,
        ClarificationOption,
        ClarificationOption,
        ClarificationOption
      ]
    | [
        ClarificationOption,
        ClarificationOption,
        ClarificationOption,
        ClarificationOption,
        ClarificationOption,
        ClarificationOption,
        ClarificationOption,
        ClarificationOption
      ]
    | [
        ClarificationOption,
        ClarificationOption,
        ClarificationOption,
        ClarificationOption,
        ClarificationOption,
        ClarificationOption,
        ClarificationOption,
        ClarificationOption,
        ClarificationOption
      ]
    | [
        ClarificationOption,
        ClarificationOption,
        ClarificationOption,
        ClarificationOption,
        ClarificationOption,
        ClarificationOption,
        ClarificationOption,
        ClarificationOption,
        ClarificationOption,
        ClarificationOption
      ];
}
export interface ClarificationOption {
  id: OpaqueIdentifier;
  label: string;
  description?: string;
}
export interface EntityMultiSelectionResponseSpec {
  type: 'entity_multi_selection';
  required: boolean;
  allow_free_text?: boolean;
  entity: {
    entity_type: string;
    search_owner: 'dotnet';
    minimum_search_length?: number;
  };
  minimum_selections?: number;
  maximum_selections: number;
  /**
   * @maxItems 100
   */
  options?: ClarificationOption[];
  /**
   * @maxItems 10
   */
  selected_entity_ids?:
    | []
    | [OpaqueIdentifier]
    | [OpaqueIdentifier, OpaqueIdentifier]
    | [OpaqueIdentifier, OpaqueIdentifier, OpaqueIdentifier]
    | [OpaqueIdentifier, OpaqueIdentifier, OpaqueIdentifier, OpaqueIdentifier]
    | [OpaqueIdentifier, OpaqueIdentifier, OpaqueIdentifier, OpaqueIdentifier, OpaqueIdentifier]
    | [
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier
      ]
    | [
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier
      ]
    | [
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier
      ]
    | [
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier
      ]
    | [
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier,
        OpaqueIdentifier
      ];
}
export interface ConfirmationAction {
  kind: 'confirmation';
  confirmation_id: OpaqueIdentifier;
  operation: {
    action_id: string;
    label: string;
    prepared_operation_id: OpaqueIdentifier;
  };
  summary: JsonObject;
  impact: {
    level: 'low' | 'medium' | 'high';
    sends_external_message: boolean;
    creates_data: boolean;
    updates_data: boolean;
    deletes_data: boolean;
  };
  warnings?: MessageItem[];
  response_spec: {
    type: 'confirmation';
    required: true;
    require_explicit_acceptance: true;
    /**
     * @minItems 2
     * @maxItems 2
     */
    options: never[];
  };
  expires_at: string;
}
export interface MessageItem {
  code: string;
  message: string;
}
export interface QueryExecutionAction {
  kind: 'query_execution';
  execution_id: OpaqueIdentifier;
  query: {
    dialect: 'sqlserver';
    statement: string;
    /**
     * @maxItems 200
     */
    parameters: TypedParameter[];
  };
  requirements: CapabilityRequirements;
  execution_policy: ExecutionPolicy;
  expected_result: ExpectedResult;
  presentation:
    | DataGridPresentation
    | ChartPresentation
    | DataGridWithChartPresentation
    | DevexpressReportViewerPresentation;
  continuation: Continuation;
}
export interface TypedParameter {
  name: string;
  data_type:
    | 'string'
    | 'int'
    | 'long'
    | 'decimal'
    | 'boolean'
    | 'date'
    | 'datetime'
    | 'datetime2'
    | 'guid'
    | 'json';
  value: ParameterValue;
}
export interface CapabilityRequirements {
  /**
   * @minItems 1
   */
  capabilities: [string, ...string[]];
  resource: string;
  scope_binding_required?: boolean;
}
export interface ExecutionPolicy {
  read_only: boolean;
  maximum_rows: number;
  timeout_seconds: number;
}
export interface ExpectedResult {
  kind: 'data_view' | 'report_document' | 'operation_summary' | 'file';
  shape?:
    'tabular' | 'time_series' | 'metrics' | 'financial_statement' | 'operation_summary' | 'file';
  columns?: ExpectedColumn[];
}
export interface ExpectedColumn {
  name: string;
  data_type: 'string' | 'integer' | 'decimal' | 'boolean' | 'date' | 'datetime' | 'guid';
  role?: 'identifier' | 'category' | 'measure' | 'time' | 'label' | 'metadata';
}
export interface DataGridPresentation {
  kind: 'data_grid';
  title: string;
  columns?: PresentationColumn[];
  remote_operations?: boolean;
  capabilities?: PresentationCapabilities;
}
export interface PresentationColumn {
  field: string;
  caption: string;
  data_type: 'string' | 'integer' | 'decimal' | 'boolean' | 'date' | 'datetime';
  format?: ColumnFormat;
  visible?: boolean;
  width?: number;
}
export interface ColumnFormat {
  type?: 'currency' | 'number' | 'percent' | 'date' | 'datetime' | 'text';
  currency?: string;
  precision?: number;
}
export interface PresentationCapabilities {
  allow_sorting?: boolean;
  allow_filtering?: boolean;
  allow_grouping?: boolean;
  allow_column_chooser?: boolean;
  allow_search?: boolean;
  allow_paging?: boolean;
  allow_print?: boolean;
  allow_export?: boolean;
  export_formats?: ('xlsx' | 'pdf' | 'png' | 'csv')[];
}
export interface ChartPresentation {
  kind: 'chart';
  title: string;
  chart: ChartDefinition;
  capabilities?: PresentationCapabilities;
}
export interface ChartDefinition {
  type: 'bar' | 'column' | 'line' | 'area' | 'pie' | 'donut';
  category_field: string;
  /**
   * @minItems 1
   */
  series: [ChartSeries, ...ChartSeries[]];
}
export interface ChartSeries {
  field: string;
  label: string;
}
export interface DataGridWithChartPresentation {
  kind: 'data_grid_with_chart';
  title: string;
  columns?: PresentationColumn[];
  grid?: {
    columns?: PresentationColumn[];
  };
  chart: ChartDefinition;
  remote_operations?: boolean;
  capabilities?: PresentationCapabilities;
}
export interface DevexpressReportViewerPresentation {
  kind: 'devexpress_report_viewer';
  title: string;
  capabilities?: PresentationCapabilities;
}
export interface Continuation {
  mode: 'render_only' | 'narrative' | 'python_analysis';
  result_payload?: 'metadata_only' | 'aggregates_and_preview' | 'bounded_dataset';
  maximum_preview_rows?: number;
  maximum_rows?: number;
  analysis_operation?: string;
}
export interface SkillExecutionAction {
  kind: 'skill_execution';
  execution_id: OpaqueIdentifier;
  skill_id: string;
  skill_version: SemanticVersion;
  parameters: JsonObject;
  requirements: CapabilityRequirements;
  expected_result: ExpectedResult;
  presentation:
    | DataGridPresentation
    | ChartPresentation
    | DataGridWithChartPresentation
    | DevexpressReportViewerPresentation
    | OperationResultPresentation;
  continuation: Continuation;
}
export interface OperationResultPresentation {
  kind: 'operation_result';
  title: string;
  sections?: ('summary' | 'issues' | 'file')[];
  grid?: {
    columns?: PresentationColumn[];
  };
  capabilities?: PresentationCapabilities;
}
export interface AttachmentProcessingAction {
  kind: 'attachment_processing';
  execution_id: OpaqueIdentifier;
  operation: string;
  /**
   * @minItems 1
   * @maxItems 20
   */
  attachments:
    | [AttachmentBinding]
    | [AttachmentBinding, AttachmentBinding]
    | [AttachmentBinding, AttachmentBinding, AttachmentBinding]
    | [AttachmentBinding, AttachmentBinding, AttachmentBinding, AttachmentBinding]
    | [
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding
      ]
    | [
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding
      ]
    | [
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding
      ]
    | [
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding
      ]
    | [
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding
      ]
    | [
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding
      ]
    | [
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding
      ]
    | [
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding
      ]
    | [
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding
      ]
    | [
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding
      ]
    | [
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding
      ]
    | [
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding
      ]
    | [
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding
      ]
    | [
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding
      ]
    | [
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding
      ]
    | [
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding,
        AttachmentBinding
      ];
  processing: {
    mode:
      | 'structured_import_validation'
      | 'document_data_extraction'
      | 'image_data_extraction'
      | 'document_classification'
      | 'attachment_preview'
      | 'corrected_file_validation';
    expected_entity: string;
    all_or_nothing: boolean;
  };
  requirements: CapabilityRequirements;
  expected_result: ExpectedResult;
  presentation: OperationResultPresentation;
  continuation: Continuation;
}
export interface AttachmentBinding {
  attachment_id: OpaqueIdentifier;
  role: string;
}
export interface AnalyticsExecutionAction {
  kind: 'analytics_execution';
  execution_id: OpaqueIdentifier;
  analytics: {
    operation_id: string;
    operation_version: SemanticVersion;
    parameters: JsonObject;
  };
  data_request: {
    kind: 'query_execution';
    dataset_id: string;
    /**
     * @minItems 1
     */
    required_fields: [ExpectedColumn, ...ExpectedColumn[]];
    period?: {
      start_date: string;
      end_date_exclusive: string;
    };
    granularity?: 'day' | 'week' | 'month' | 'quarter' | 'year';
    filters?: JsonObject;
  };
  requirements: CapabilityRequirements;
  execution_policy: ExecutionPolicy;
  expected_result: ExpectedResult;
  presentation: DataGridPresentation | ChartPresentation | DataGridWithChartPresentation;
  continuation: Continuation & {
    mode: 'python_analysis';
    result_payload: 'bounded_dataset';
    [k: string]: any;
  };
}
export interface DataViewResult {
  kind: 'data_view';
  result_id: OpaqueIdentifier;
  execution_id?: OpaqueIdentifier;
  data:
    | {
        mode: 'inline';
        rows: {
          [k: string]: any;
        }[];
        total_count: number;
      }
    | {
        mode: 'remote';
        total_count: number;
      };
  summary?: JsonObject;
  narrative?: string;
}
export interface ReportDocumentResult {
  kind: 'report_document';
  report_id: OpaqueIdentifier;
  report_reference: string;
  execution_id?: OpaqueIdentifier;
}
export interface NarrativeResult {
  kind: 'narrative';
  content: string;
}
export interface OperationSummaryResult {
  kind: 'operation_summary';
  operation: string;
  execution_id?: OpaqueIdentifier;
  summary: JsonObject;
  issues?: IssueItem[];
}
export interface IssueItem {
  row_number?: number;
  column?: string | null;
  value?: any;
  code: string;
  message: string;
}
export interface FileResult {
  kind: 'file';
  file_id: OpaqueIdentifier;
  name: string;
  mime_type: string;
}
export interface TextPresentation {
  kind: 'text';
  title?: string;
}
export interface CreateSavedReportAvailableAction {
  kind: 'create_saved_report';
  action_id: 'reports.saved.create';
  label: 'Agregar al menú como reporte recurrente';
  source_execution_id: OpaqueIdentifier;
  source_result_id: OpaqueIdentifier;
  requires_confirmation: true;
  defaults?: {
    name?: string;
    menu_group?: string;
    presentation_kind?: 'data_grid' | 'data_grid_with_chart';
  };
  parameter_definitions?: ParameterDefinition[];
}
export interface ParameterDefinition {
  name: string;
  label: string;
  data_type:
    'string' | 'number' | 'integer' | 'boolean' | 'date' | 'date_range' | 'entity_selection';
  required: boolean;
}
export interface ReplaceAttachmentAvailableAction {
  kind: 'replace_attachment';
  action_id: 'attachments.replace';
  label: string;
  source_execution_id: OpaqueIdentifier;
  /**
   * @minItems 1
   */
  accepted_mime_types: [string, ...string[]];
}
export interface ErrorDetail {
  code: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  retryable: boolean;
  correlation_id?: OpaqueIdentifier;
  details?: MessageItem[];
}
export interface Diagnostics {
  graph_run_id?: OpaqueIdentifier;
  retrieval_count?: number;
  warnings?: MessageItem[];
}

