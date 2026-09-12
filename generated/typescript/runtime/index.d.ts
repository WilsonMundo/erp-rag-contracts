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

export type LabelFormat = 'auto' | 'date' | 'month_short' | 'month_year' | 'category';
export type Title = string | null;
export type Format = 'auto' | 'number' | 'integer' | 'currency' | 'percent';
export type Scale = 'linear' | 'logarithmic';
export type Title1 = string | null;
export type ZeroBaseline = 'required' | 'optional' | 'suppressed';
export type CategoryField = string;
export type ChartDefinitionVersion = '2.0';
export type MaxCategories = number;
export type MaxSeries = number;
export type Overflow = 'degrade';
/**
 * @minItems 1
 * @maxItems 8
 */
export type MeasureFields =
  | [string]
  | [string, string]
  | [string, string, string]
  | [string, string, string, string]
  | [string, string, string, string, string]
  | [string, string, string, string, string, string]
  | [string, string, string, string, string, string, string]
  | [string, string, string, string, string, string, string, string];
export type Orientation = ('horizontal' | 'vertical') | null;
export type SeriesGroupField = string | null;
export type SeriesMode = 'fields' | 'grouped';
export type Direction = 'ascending' | 'descending';
export type Field = string;
export type Nulls = 'first' | 'last';
export type Stacking = 'none' | 'normal' | 'percent';
export type Title2 = string;
export type Type = 'bar' | 'column' | 'line' | 'area' | 'pie' | 'donut';

/**
 * Contrato normativo runtime chart-definition versión 2.
 */
export interface ChartDefinitionV2 {
  axis: ChartAxisV1;
  category_field: CategoryField;
  chart_definition_version: ChartDefinitionVersion;
  limit: ChartLimitV1;
  measure_fields: MeasureFields;
  orientation: Orientation;
  series_group_field: SeriesGroupField;
  series_mode: SeriesMode;
  sort: ChartSortV1 | null;
  stacking: Stacking;
  title: Title2;
  type: Type;
}
export interface ChartAxisV1 {
  category: ChartCategoryAxisV1;
  value: ChartValueAxisV1;
}
export interface ChartCategoryAxisV1 {
  label_format: LabelFormat;
  title: Title;
}
export interface ChartValueAxisV1 {
  format: Format;
  scale: Scale;
  title: Title1;
  zero_baseline: ZeroBaseline;
}
export interface ChartLimitV1 {
  max_categories: MaxCategories;
  max_series: MaxSeries;
  overflow: Overflow;
}
export interface ChartSortV1 {
  direction: Direction;
  field: Field;
  nulls: Nulls;
}

export type AnalysisIntent =
  | (
      | 'none'
      | 'identify_highest'
      | 'identify_lowest'
      | 'compare'
      | 'describe_distribution'
      | 'analyze_trend'
    )
  | null;
export type Confidence = number;
export type Intent =
  | 'chat'
  | 'query'
  | 'skill'
  | 'attachment'
  | 'analytics'
  | 'deny'
  | 'unsupported'
  | 'clarification';
export type IntentClassificationVersion = '2.0';
export type IsErpRelated = boolean;
/**
 * @maxItems 20
 */
export type MissingInformation =
  | []
  | [
      | 'query_type'
      | 'period'
      | 'metric'
      | 'filters'
      | 'grouping'
      | 'entity'
      | 'operation'
      | 'attachment_purpose'
    ]
  | [
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      )
    ]
  | [
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      )
    ]
  | [
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      )
    ]
  | [
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      )
    ]
  | [
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      )
    ]
  | [
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      )
    ]
  | [
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      )
    ]
  | [
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      )
    ]
  | [
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      )
    ]
  | [
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      )
    ]
  | [
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      )
    ]
  | [
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      )
    ]
  | [
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      )
    ]
  | [
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      )
    ]
  | [
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      )
    ]
  | [
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      )
    ]
  | [
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      )
    ]
  | [
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      )
    ]
  | [
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      ),
      (
        | 'query_type'
        | 'period'
        | 'metric'
        | 'filters'
        | 'grouping'
        | 'entity'
        | 'operation'
        | 'attachment_purpose'
      )
    ];
export type Mode = 'auto' | 'include' | 'only';
export type PresentationPreferenceVersion = '1.0';
/**
 * @maxItems 5
 */
export type Required =
  | []
  | ['kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge']
  | [
      'kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge',
      'kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge'
    ]
  | [
      'kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge',
      'kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge',
      'kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge'
    ]
  | [
      'kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge',
      'kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge',
      'kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge',
      'kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge'
    ]
  | [
      'kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge',
      'kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge',
      'kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge',
      'kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge',
      'kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge'
    ];
export type Reason =
  | 'erp_general'
  | 'erp_data_query'
  | 'erp_operation'
  | 'erp_attachment'
  | 'erp_analytics'
  | 'out_of_domain'
  | 'erp_unsupported'
  | 'ambiguous';
export type RequiresClarification = boolean;
export type TaskKind =
  | (
      | 'scalar'
      | 'detail'
      | 'grouped_aggregate'
      | 'ranking'
      | 'comparison'
      | 'distribution'
      | 'trend'
    )
  | null;
export type Name = string;
export type Nullable = boolean;
export type SqlType = 'bit';
export type Value = boolean | null;
export type Name1 = string;
export type Nullable1 = boolean;
export type SqlType1 = 'tinyint' | 'smallint' | 'int' | 'bigint';
export type Value1 = number | null;
export type Name2 = string;
export type Nullable2 = boolean;
export type Precision = number;
export type Scale = number;
export type SqlType2 = 'decimal';
export type Value2 = string | null;
export type Name3 = string;
export type Nullable3 = boolean;
export type SqlType3 = 'date';
export type Value3 = string | null;
export type Name4 = string;
export type Nullable4 = boolean;
export type SqlType4 = 'datetime2';
export type Value4 = string | null;
export type Name5 = string;
export type Nullable5 = boolean;
export type SqlType5 = 'uniqueidentifier';
export type Value5 = string | null;
export type MaxLength = number;
export type Name6 = string;
export type Nullable6 = boolean;
export type SqlType6 = 'nvarchar';
export type Value6 = string | null;
/**
 * @maxItems 200
 */
export type Parameters = (
  | BitParameterDraftV2
  | IntegerParameterDraftV2
  | DecimalParameterDraftV2
  | DateParameterDraftV2
  | DateTimeParameterDraftV2
  | UniqueIdentifierParameterDraftV2
  | NVarCharParameterDraftV2
)[];
/**
 * @minItems 1
 * @maxItems 20
 */
export type Blocks =
  | [KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1]
  | [
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1
    ]
  | [
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1
    ]
  | [
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1
    ]
  | [
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1
    ]
  | [
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1
    ]
  | [
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1
    ]
  | [
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1
    ]
  | [
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1
    ]
  | [
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1
    ]
  | [
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1
    ]
  | [
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1
    ]
  | [
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1
    ]
  | [
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1
    ]
  | [
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1
    ]
  | [
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1
    ]
  | [
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1
    ]
  | [
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1
    ]
  | [
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1
    ]
  | [
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
      KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1
    ];
export type BlockId = string;
export type BlockVersion = '1.0';
export type Format = 'auto' | 'number' | 'integer' | 'currency' | 'percent';
export type Kind = 'kpi';
export type Title = string;
export type Value7 =
  FieldValueReferenceV1 | ResultAggregateValueReferenceV1 | ResolvedReferenceValueReferenceV1;
export type Field = string;
export type Source = 'field';
export type Aggregation = 'sum' | 'avg' | 'min' | 'max' | 'count';
export type Field1 = string;
export type Scope = 'result_set';
export type Source1 = 'result_aggregate';
export type ReferenceId = string;
export type Source2 = 'resolved_reference';
export type BlockId1 = string;
export type BlockVersion1 = '1.0';
/**
 * @maxItems 8
 */
export type Features =
  | []
  | [
      | 'sorting'
      | 'filtering'
      | 'grouping'
      | 'search'
      | 'paging'
      | 'column_chooser'
      | 'summaries'
      | 'export'
    ]
  | [
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      )
    ]
  | [
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      )
    ]
  | [
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      )
    ]
  | [
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      )
    ]
  | [
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      )
    ]
  | [
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      )
    ]
  | [
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      )
    ];
/**
 * @minItems 1
 * @maxItems 100
 */
export type Fields = [string, ...string[]];
export type Kind1 = 'data_grid';
export type Title1 = string;
export type BlockId2 = string;
export type BlockVersion2 = '1.0';
/**
 * @maxItems 20
 */
export type Columns =
  | []
  | [string]
  | [string, string]
  | [string, string, string]
  | [string, string, string, string]
  | [string, string, string, string, string]
  | [string, string, string, string, string, string]
  | [string, string, string, string, string, string, string]
  | [string, string, string, string, string, string, string, string]
  | [string, string, string, string, string, string, string, string, string]
  | [string, string, string, string, string, string, string, string, string, string]
  | [string, string, string, string, string, string, string, string, string, string, string]
  | [string, string, string, string, string, string, string, string, string, string, string, string]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ];
/**
 * @maxItems 10
 */
export type Features1 =
  | []
  | [
      | 'rows'
      | 'columns'
      | 'values'
      | 'filtering'
      | 'sorting'
      | 'totals'
      | 'subtotals'
      | 'expand_collapse'
      | 'drilldown'
      | 'export'
    ]
  | [
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      )
    ]
  | [
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      )
    ]
  | [
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      )
    ]
  | [
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      )
    ]
  | [
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      )
    ]
  | [
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      )
    ]
  | [
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      )
    ]
  | [
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      )
    ]
  | [
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      )
    ];
export type Kind2 = 'pivot_grid';
/**
 * @minItems 1
 * @maxItems 20
 */
export type Rows =
  | [string]
  | [string, string]
  | [string, string, string]
  | [string, string, string, string]
  | [string, string, string, string, string]
  | [string, string, string, string, string, string]
  | [string, string, string, string, string, string, string]
  | [string, string, string, string, string, string, string, string]
  | [string, string, string, string, string, string, string, string, string]
  | [string, string, string, string, string, string, string, string, string, string]
  | [string, string, string, string, string, string, string, string, string, string, string]
  | [string, string, string, string, string, string, string, string, string, string, string, string]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ];
export type Title2 = string;
/**
 * @minItems 1
 * @maxItems 20
 */
export type Values =
  | [PivotValueV1]
  | [PivotValueV1, PivotValueV1]
  | [PivotValueV1, PivotValueV1, PivotValueV1]
  | [PivotValueV1, PivotValueV1, PivotValueV1, PivotValueV1]
  | [PivotValueV1, PivotValueV1, PivotValueV1, PivotValueV1, PivotValueV1]
  | [PivotValueV1, PivotValueV1, PivotValueV1, PivotValueV1, PivotValueV1, PivotValueV1]
  | [
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1
    ]
  | [
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1
    ]
  | [
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1
    ]
  | [
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1
    ]
  | [
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1
    ]
  | [
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1
    ]
  | [
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1
    ]
  | [
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1
    ]
  | [
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1
    ]
  | [
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1
    ]
  | [
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1
    ]
  | [
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1
    ]
  | [
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1
    ]
  | [
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1,
      PivotValueV1
    ];
export type Aggregation1 = 'sum' | 'avg' | 'min' | 'max' | 'count';
export type Field2 = string;
export type BlockId3 = string;
export type BlockVersion3 = '1.0';
export type CategoryField = string;
export type Family = string;
export type Kind3 = 'chart';
export type Orientation = ('vertical' | 'horizontal') | null;
/**
 * @minItems 1
 * @maxItems 20
 */
export type Series =
  | [ChartSeriesV2]
  | [ChartSeriesV2, ChartSeriesV2]
  | [ChartSeriesV2, ChartSeriesV2, ChartSeriesV2]
  | [ChartSeriesV2, ChartSeriesV2, ChartSeriesV2, ChartSeriesV2]
  | [ChartSeriesV2, ChartSeriesV2, ChartSeriesV2, ChartSeriesV2, ChartSeriesV2]
  | [ChartSeriesV2, ChartSeriesV2, ChartSeriesV2, ChartSeriesV2, ChartSeriesV2, ChartSeriesV2]
  | [
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2
    ]
  | [
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2
    ]
  | [
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2
    ]
  | [
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2
    ]
  | [
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2
    ]
  | [
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2
    ]
  | [
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2
    ]
  | [
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2
    ]
  | [
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2
    ]
  | [
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2
    ]
  | [
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2
    ]
  | [
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2
    ]
  | [
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2
    ]
  | [
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2,
      ChartSeriesV2
    ];
export type Aggregation2 = 'none' | 'sum' | 'avg' | 'min' | 'max' | 'count';
export type Axis = string | null;
export type Field3 = string;
export type Label = string;
export type Type = string;
export type Title3 = string;
export type BlockId4 = string;
export type BlockVersion4 = '1.0';
export type GaugeType = 'circular' | 'linear';
export type Kind4 = 'gauge';
export type Maximum =
  | (FieldValueReferenceV1 | ResultAggregateValueReferenceV1 | ResolvedReferenceValueReferenceV1)
  | null;
export type Minimum =
  | (FieldValueReferenceV1 | ResultAggregateValueReferenceV1 | ResolvedReferenceValueReferenceV1)
  | null;
/**
 * @maxItems 20
 */
export type Ranges =
  | []
  | [GaugeRangeV1]
  | [GaugeRangeV1, GaugeRangeV1]
  | [GaugeRangeV1, GaugeRangeV1, GaugeRangeV1]
  | [GaugeRangeV1, GaugeRangeV1, GaugeRangeV1, GaugeRangeV1]
  | [GaugeRangeV1, GaugeRangeV1, GaugeRangeV1, GaugeRangeV1, GaugeRangeV1]
  | [GaugeRangeV1, GaugeRangeV1, GaugeRangeV1, GaugeRangeV1, GaugeRangeV1, GaugeRangeV1]
  | [
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1
    ]
  | [
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1
    ]
  | [
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1
    ]
  | [
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1
    ]
  | [
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1
    ]
  | [
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1
    ]
  | [
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1
    ]
  | [
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1
    ]
  | [
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1
    ]
  | [
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1
    ]
  | [
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1
    ]
  | [
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1
    ]
  | [
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1
    ]
  | [
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1,
      GaugeRangeV1
    ];
export type End =
  FieldValueReferenceV1 | ResultAggregateValueReferenceV1 | ResolvedReferenceValueReferenceV1;
export type Label1 = string;
export type Start =
  FieldValueReferenceV1 | ResultAggregateValueReferenceV1 | ResolvedReferenceValueReferenceV1;
export type Target =
  | (FieldValueReferenceV1 | ResultAggregateValueReferenceV1 | ResolvedReferenceValueReferenceV1)
  | null;
export type Title4 = string;
export type Value8 =
  FieldValueReferenceV1 | ResultAggregateValueReferenceV1 | ResolvedReferenceValueReferenceV1;
export type CapabilityProfile = string;
export type Columns1 = number | null;
export type Mode1 = 'flow' | 'grid';
export type PresentationLayoutVersion = '1.0';
export type PresentationPlanVersion = '2.0';
export type Title5 = string;
export type Aggregation3 = 'none' | 'sum' | 'count' | 'avg' | 'min' | 'max' | 'unknown';
export type Key = string;
export type Ordinal = number;
export type PresentationSupport = boolean;
export type ProposedSemanticColumnVersion = '2.0';
export type Role = 'identifier' | 'dimension' | 'measure' | 'unknown';
export type SemanticType =
  | 'identifier'
  | 'category'
  | 'number'
  | 'currency'
  | 'percent'
  | 'date'
  | 'datetime'
  | 'boolean'
  | 'unknown';
/**
 * @maxItems 200
 */
export type Columns2 = ProposedSemanticColumnV2[];
export type ResultSetSemanticsVersion = '1.0';
export type Selection = AllMatchesSelectionV1 | TopNSelectionV1 | SampleSelectionV1;
export type Kind5 = 'all_matches';
export type Direction = 'ascending' | 'descending';
export type Kind6 = 'top_n';
export type Limit = number;
export type OrderField = string;
export type Kind7 = 'sample';
export type Limit1 = number;
export type Shape =
  'scalar' | 'detail' | 'grouped_aggregate' | 'ranking' | 'comparison' | 'distribution' | 'trend';
export type Version = '2.0';
export type QuerySqlDraftVersion = '6.0';
export type Sql = string;
export type ResultSetSelectionV1 = AllMatchesSelectionV1 | TopNSelectionV1 | SampleSelectionV1;
export type ValueReferenceV1 =
  FieldValueReferenceV1 | ResultAggregateValueReferenceV1 | ResolvedReferenceValueReferenceV1;
export type Label2 = string;
export type ReferenceId1 = string;
export type ReferenceType = 'target' | 'goal' | 'budget' | 'threshold';
export type ResolvedAt = string;
export type ResolvedBusinessReferenceVersion = '1.0';
export type SemanticType1 = 'number' | 'currency' | 'percent' | 'date' | 'datetime';
export type SourceId = string;
export type Value9 = string | number | boolean | null;
/**
 * @maxItems 50
 */
export type References = ResolvedBusinessReferenceV1[];
export type ResolvedBusinessReferenceContextVersion = '1.0';
export type PresentationBlockV2 =
  KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1;
export type BlockId5 = string;
export type Code =
  | (
      | 'BLOCK_FIELD_NOT_FOUND'
      | 'BLOCK_TYPE_INCOMPATIBLE'
      | 'BLOCK_AGGREGATION_UNSUPPORTED'
      | 'BLOCK_CAPABILITY_UNSUPPORTED'
      | 'BLOCK_CARDINALITY_EXCEEDED'
      | 'BLOCK_TRUNCATED_RESULT_UNSAFE'
      | 'BLOCK_REFERENCE_MISSING'
      | 'BLOCK_SCOPE_INVALID'
      | 'BLOCK_SCHEMA_INVALID'
    )
  | null;
export type Message = string | null;
export type PresentationBlockResolutionVersion = '1.0';
export type Status = 'materialized' | 'degraded';
/**
 * @maxItems 20
 */
export type Blocks1 =
  | []
  | [
      | MaterializedKpiBlockV1
      | MaterializedGridBlockV1
      | MaterializedPivotBlockV1
      | MaterializedChartBlockV1
      | MaterializedGaugeBlockV1
    ]
  | [
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      )
    ]
  | [
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      )
    ]
  | [
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      )
    ]
  | [
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      )
    ]
  | [
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      )
    ]
  | [
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      )
    ]
  | [
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      )
    ]
  | [
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      )
    ]
  | [
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      )
    ]
  | [
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      )
    ]
  | [
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      )
    ]
  | [
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      )
    ]
  | [
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      )
    ]
  | [
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      )
    ]
  | [
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      )
    ]
  | [
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      )
    ]
  | [
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      )
    ]
  | [
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      )
    ]
  | [
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      ),
      (
        | MaterializedKpiBlockV1
        | MaterializedGridBlockV1
        | MaterializedPivotBlockV1
        | MaterializedChartBlockV1
        | MaterializedGaugeBlockV1
      )
    ];
export type BlockId6 = string;
export type BlockVersion5 = '1.0';
export type Format1 = 'auto' | 'number' | 'integer' | 'currency' | 'percent';
export type Kind8 = 'kpi';
export type Kind9 = 'all_matches' | 'top_n' | 'sample';
export type Label3 = string | null;
export type Title6 = string;
export type Value10 = string | number | boolean | null;
export type BlockId7 = string;
export type BlockVersion6 = '1.0';
/**
 * @maxItems 8
 */
export type Features2 =
  | []
  | [
      | 'sorting'
      | 'filtering'
      | 'grouping'
      | 'search'
      | 'paging'
      | 'column_chooser'
      | 'summaries'
      | 'export'
    ]
  | [
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      )
    ]
  | [
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      )
    ]
  | [
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      )
    ]
  | [
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      )
    ]
  | [
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      )
    ]
  | [
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      )
    ]
  | [
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      )
    ];
/**
 * @minItems 1
 * @maxItems 100
 */
export type Fields1 = [string, ...string[]];
export type Kind10 = 'data_grid';
export type Title7 = string;
export type BlockId8 = string;
export type BlockVersion7 = '1.0';
export type Columns3 = string[];
/**
 * @maxItems 10
 */
export type Features3 =
  | []
  | [
      | 'rows'
      | 'columns'
      | 'values'
      | 'filtering'
      | 'sorting'
      | 'totals'
      | 'subtotals'
      | 'expand_collapse'
      | 'drilldown'
      | 'export'
    ]
  | [
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      )
    ]
  | [
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      )
    ]
  | [
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      )
    ]
  | [
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      )
    ]
  | [
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      )
    ]
  | [
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      )
    ]
  | [
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      )
    ]
  | [
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      )
    ]
  | [
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      )
    ];
export type Kind11 = 'pivot_grid';
export type Rows1 = string[];
export type Title8 = string;
/**
 * @minItems 1
 */
export type Values1 = [MaterializedPivotValueV1, ...MaterializedPivotValueV1[]];
export type Aggregation4 = 'sum' | 'avg' | 'min' | 'max' | 'count';
export type Field4 = string;
export type BlockId9 = string;
export type BlockVersion8 = '1.0';
export type CategoryField1 = string;
export type Family1 = string;
export type Kind12 = 'chart';
export type Orientation1 = ('vertical' | 'horizontal') | null;
/**
 * @minItems 1
 */
export type Series1 = [MaterializedChartSeriesV1, ...MaterializedChartSeriesV1[]];
export type Axis1 = string | null;
export type Field5 = string;
export type Label4 = string;
export type Type1 = string;
export type Title9 = string;
export type BlockId10 = string;
export type BlockVersion9 = '1.0';
export type GaugeType1 = 'circular' | 'linear';
export type Kind13 = 'gauge';
export type Maximum1 = string | number | boolean | null;
export type Minimum1 = string | number | boolean | null;
export type End1 = string | number | boolean | null;
export type Label5 = string;
export type Start1 = string | number | boolean | null;
export type Ranges1 = MaterializedGaugeRangeV1[];
export type Target1 = string | number | boolean | null;
export type Title10 = string;
export type Value11 = string | number | boolean | null;
export type CapabilityProfile1 = string;
export type MaterializedPresentationVersion = '2.0';
/**
 * @minItems 1
 * @maxItems 20
 */
export type Resolutions =
  | [PresentationBlockResolutionV1]
  | [PresentationBlockResolutionV1, PresentationBlockResolutionV1]
  | [PresentationBlockResolutionV1, PresentationBlockResolutionV1, PresentationBlockResolutionV1]
  | [
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1
    ]
  | [
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1
    ]
  | [
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1
    ]
  | [
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1
    ]
  | [
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1
    ]
  | [
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1
    ]
  | [
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1
    ]
  | [
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1
    ]
  | [
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1
    ]
  | [
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1
    ]
  | [
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1
    ]
  | [
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1
    ]
  | [
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1
    ]
  | [
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1
    ]
  | [
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1
    ]
  | [
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1
    ]
  | [
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1,
      PresentationBlockResolutionV1
    ];
export type Title11 = string;
export type Display = string;
export type EndExclusive = string | null;
export type Key1 = string;
export type Label6 = string;
export type Start2 = string | null;
export type Type2 = 'scalar' | 'date_range' | 'integer';
export type Value12 = string | number | boolean | null;
/**
 * @maxItems 100
 */
export type AppliedFilters = QueryAppliedFilterV2[];
export type Aggregation5 = 'none' | 'sum' | 'count' | 'avg' | 'min' | 'max' | 'unknown';
export type Currency = string | null;
export type Style = 'currency' | 'decimal' | 'percent' | 'date' | 'datetime';
export type Key2 = string;
export type Nullable7 = boolean;
export type SemanticType2 =
  | 'unknown'
  | 'identifier'
  | 'category'
  | 'number'
  | 'currency'
  | 'percent'
  | 'date'
  | 'datetime'
  | 'boolean';
export type Title12 = string;
export type Type3 =
  'string' | 'boolean' | 'date' | 'datetime' | 'integer' | 'bigint' | 'decimal' | 'number' | 'guid';
/**
 * @maxItems 200
 */
export type Columns4 = QueryResultColumnV2[];
export type AstFingerprint = string;
export type CatalogSha256 = string;
export type DurationMs = number;
export type Truncated = boolean;
export type QueryId = string;
export type QueryResultVersion = '2.0';
export type ResultFingerprint = string;
export type ResultId = string;
export type RowCount = number;
/**
 * @maxItems 500
 */
export type Rows2 = {
  [k: string]: string | number | boolean | null;
}[];
export type Status1 = 'completed';
export type ConversationId = string;
export type EventId = string;
export type EventVersion = '2.0';
export type RequestId = string;
export type Sequence = number;
export type Timestamp = string;
export type TurnId = string;
export type Type4 =
  | 'turn.started'
  | 'turn.progress'
  | 'assistant.delta'
  | 'heartbeat'
  | 'query.result'
  | 'query.narrative_pending'
  | 'query.narrative'
  | 'query.narrative_degraded'
  | 'turn.response'
  | 'turn.error';
export type ExecutedAt = string;
export type HistoricalResultVersion = '2.0';
export type AstFingerprint1 = string;
export type CapabilityProfile2 = string;
export type CatalogSha2561 = string;
export type MaxLength1 = number | null;
export type Name7 = string;
export type Nullable8 = boolean;
export type Precision1 = number | null;
export type QueryArtifactParameterVersion = '1.0';
export type Rebindable = boolean;
export type Scale1 = number | null;
export type SemanticRole = string;
export type SqlType7 =
  | 'bit'
  | 'tinyint'
  | 'smallint'
  | 'int'
  | 'bigint'
  | 'decimal'
  | 'date'
  | 'datetime2'
  | 'uniqueidentifier'
  | 'nvarchar';
export type Value13 = string | number | boolean | null;
/**
 * @maxItems 200
 */
export type Parameters1 = QueryArtifactParameterV1[];
export type QueryArtifactId = string;
export type QueryArtifactVersion = '1.0';
export type Available = boolean;
export type Mode2 = 'none' | 'same_parameters' | 'rebind_parameters';
export type RebindableParameters = string[];
export type RequeryCapabilityVersion = '1.0';
export type Sql1 = string;
export type QueryExecutionId = string;
export type SnapshotStatus = 'available' | 'expired' | 'unavailable';
export type HistoricalRequeryResultVersion = '2.0';
export type QueryArtifactId1 = string;
export type QueryExecutionId1 = string;
export type DashboardDefinitionVersion = '1.0';
export type DashboardId = string;
/**
 * @maxItems 20
 */
export type GlobalFilters =
  | []
  | [DashboardFilterV1]
  | [DashboardFilterV1, DashboardFilterV1]
  | [DashboardFilterV1, DashboardFilterV1, DashboardFilterV1]
  | [DashboardFilterV1, DashboardFilterV1, DashboardFilterV1, DashboardFilterV1]
  | [DashboardFilterV1, DashboardFilterV1, DashboardFilterV1, DashboardFilterV1, DashboardFilterV1]
  | [
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1
    ]
  | [
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1
    ]
  | [
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1
    ]
  | [
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1
    ]
  | [
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1
    ]
  | [
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1
    ]
  | [
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1
    ]
  | [
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1
    ]
  | [
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1
    ]
  | [
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1
    ]
  | [
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1
    ]
  | [
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1
    ]
  | [
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1
    ]
  | [
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1
    ]
  | [
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1,
      DashboardFilterV1
    ];
export type DashboardFilterVersion = '1.0';
export type FilterId = string;
export type Label7 = string;
export type Required1 = boolean;
export type Type5 = 'scalar' | 'date_range';
export type Columns5 = number;
export type RowHeight = number;
export type Status2 = 'draft' | 'building' | 'ready' | 'published' | 'degraded' | 'archived';
export type Title13 = string;
export type BlockId11 = string;
export type DashboardWidgetVersion = '1.0';
/**
 * @maxItems 20
 */
export type FilterBindings =
  | []
  | [DashboardFilterBindingV1]
  | [DashboardFilterBindingV1, DashboardFilterBindingV1]
  | [DashboardFilterBindingV1, DashboardFilterBindingV1, DashboardFilterBindingV1]
  | [
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1
    ]
  | [
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1
    ]
  | [
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1
    ]
  | [
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1
    ]
  | [
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1
    ]
  | [
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1
    ]
  | [
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1
    ]
  | [
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1
    ]
  | [
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1
    ]
  | [
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1
    ]
  | [
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1
    ]
  | [
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1
    ]
  | [
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1
    ]
  | [
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1
    ]
  | [
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1
    ]
  | [
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1
    ]
  | [
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1,
      DashboardFilterBindingV1
    ];
export type DashboardFilterBindingVersion = '1.0';
export type FilterId1 = string;
/**
 * @minItems 1
 * @maxItems 10
 */
export type Mappings =
  | [DashboardFilterMappingV1]
  | [DashboardFilterMappingV1, DashboardFilterMappingV1]
  | [DashboardFilterMappingV1, DashboardFilterMappingV1, DashboardFilterMappingV1]
  | [
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1
    ]
  | [
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1
    ]
  | [
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1
    ]
  | [
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1
    ]
  | [
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1
    ]
  | [
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1
    ]
  | [
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1,
      DashboardFilterMappingV1
    ];
export type DashboardFilterMappingVersion = '1.0';
export type SourcePath = 'value' | 'start' | 'end_exclusive';
export type TargetParameter = string;
export type H = number;
export type W = number;
export type X = number;
export type Y = number;
export type QueryArtifactId2 = string;
export type WidgetId = string;
/**
 * @maxItems 100
 */
export type Widgets = DashboardWidgetV1[];
export type DashboardId1 = string;
export type EventId1 = string;
export type EventVersion1 = '1.0';
export type Sequence1 = number;
export type Timestamp1 = string;
export type Type6 =
  | 'dashboard.started'
  | 'dashboard.plan.updated'
  | 'dashboard.widget.started'
  | 'dashboard.widget.result'
  | 'dashboard.widget.degraded'
  | 'dashboard.widget.failed'
  | 'dashboard.completed';
export type WidgetId1 = string | null;
export type DashboardId2 = string;
export type DashboardResultVersion = '1.0';
export type Status3 = 'ready' | 'degraded' | 'failed';
export type Block =
  | (
      | MaterializedKpiBlockV1
      | MaterializedGridBlockV1
      | MaterializedPivotBlockV1
      | MaterializedChartBlockV1
      | MaterializedGaugeBlockV1
    )
  | null;
export type ErrorCode = string | null;
export type Status4 = 'completed' | 'degraded' | 'failed';
export type WidgetId2 = string;
export type Widgets1 = DashboardWidgetResultV1[];
export type ActionId = string;
export type Entity = string;
export type ImportOperationVersion = '1.0';
export type Operation = 'import';
export type PolicyId = string;
export type WriteMode = 'create' | 'update' | 'upsert';
export type AttachmentSha256 = string;
export type ImportPreflightVersion = '1.0';
export type Code1 = string;
export type ImportIssueVersion = '1.0';
export type Message1 = string;
export type Row = number | null;
export type Severity = 'warning' | 'error';
export type SourceColumn = string | null;
export type TargetField = string | null;
/**
 * @maxItems 1000
 */
export type Issues = ImportIssueV1[];
/**
 * @minItems 1
 * @maxItems 500
 */
export type Entries = [ImportMappingEntryV1, ...ImportMappingEntryV1[]];
export type Required2 = boolean;
export type SourceColumn1 = string;
export type TargetField1 = string;
export type ImportMappingVersion = '1.0';
export type MappingId = string;
export type Version1 = number;
export type PreflightId = string;
export type Columns6 = string[];
export type ImportPreviewVersion = '1.0';
export type Row1 = number;
export type Valid = boolean;
/**
 * @maxItems 100
 */
export type Rows3 = ImportPreviewRowV1[];
export type Truncated1 = boolean;
export type Status5 = 'validated' | 'awaiting_confirmation' | 'failed';
export type AttachmentSha2561 = string;
export type ConfirmationId = string | null;
export type State = 'not_required' | 'confirmed';
export type ImportExecutionRequestVersion = '1.0';
export type MappingId1 = string;
export type MappingVersion = number;
export type PolicyState = 'satisfied';
export type PreflightId1 = string;
export type AttachmentSha2562 = string;
export type ImportId = string;
export type ImportResultVersion = '1.0';
/**
 * @maxItems 1000
 */
export type Issues1 = ImportIssueV1[];
export type PreflightId2 = string;
export type Status6 =
  | 'validated'
  | 'awaiting_confirmation'
  | 'processing'
  | 'completed'
  | 'completed_with_errors'
  | 'failed'
  | 'cancelled';
export type Created = number;
export type Failed = number;
export type Received = number;
export type Skipped = number;
export type Updated = number;
export type Valid1 = number;
export type EventId2 = string;
export type EventVersion2 = '1.0';
export type ImportId1 = string;
export type PreflightId3 = string;
export type Sequence2 = number;
export type Timestamp2 = string;
export type Type7 =
  | 'import.started'
  | 'import.preflight.completed'
  | 'import.awaiting_confirmation'
  | 'import.execution.started'
  | 'import.progress'
  | 'import.completed'
  | 'import.failed';
export type Aggregations = ('sum' | 'avg' | 'min' | 'max' | 'count')[];
/**
 * @minItems 1
 * @maxItems 5
 */
export type BlockKinds =
  | ['kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge']
  | [
      'kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge',
      'kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge'
    ]
  | [
      'kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge',
      'kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge',
      'kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge'
    ]
  | [
      'kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge',
      'kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge',
      'kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge',
      'kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge'
    ]
  | [
      'kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge',
      'kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge',
      'kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge',
      'kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge',
      'kpi' | 'data_grid' | 'pivot_grid' | 'chart' | 'gauge'
    ];
/**
 * @minItems 1
 * @maxItems 20
 */
export type FamilySeriesCompatibility =
  | [ChartFamilySeriesCompatibilityV1]
  | [ChartFamilySeriesCompatibilityV1, ChartFamilySeriesCompatibilityV1]
  | [
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1
    ]
  | [
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1
    ]
  | [
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1
    ]
  | [
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1
    ]
  | [
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1
    ]
  | [
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1
    ]
  | [
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1
    ]
  | [
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1
    ]
  | [
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1
    ]
  | [
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1
    ]
  | [
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1
    ]
  | [
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1
    ]
  | [
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1
    ]
  | [
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1
    ]
  | [
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1
    ]
  | [
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1
    ]
  | [
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1
    ]
  | [
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1,
      ChartFamilySeriesCompatibilityV1
    ];
export type Family2 = string;
/**
 * @minItems 1
 * @maxItems 50
 */
export type SeriesTypes = [string, ...string[]];
/**
 * @maxItems 3
 */
export type Features4 =
  | []
  | ['mixed_series' | 'multiple_series' | 'multiple_axes']
  | [
      'mixed_series' | 'multiple_series' | 'multiple_axes',
      'mixed_series' | 'multiple_series' | 'multiple_axes'
    ]
  | [
      'mixed_series' | 'multiple_series' | 'multiple_axes',
      'mixed_series' | 'multiple_series' | 'multiple_axes',
      'mixed_series' | 'multiple_series' | 'multiple_axes'
    ];
/**
 * @minItems 1
 * @maxItems 2
 */
export type Orientations =
  ['vertical' | 'horizontal'] | ['vertical' | 'horizontal', 'vertical' | 'horizontal'];
/**
 * @minItems 1
 * @maxItems 3
 */
export type StackingModes =
  | ['none' | 'stacked' | 'full_stacked']
  | ['none' | 'stacked' | 'full_stacked', 'none' | 'stacked' | 'full_stacked']
  | [
      'none' | 'stacked' | 'full_stacked',
      'none' | 'stacked' | 'full_stacked',
      'none' | 'stacked' | 'full_stacked'
    ];
export type ChartFamilies = string[];
export type ChartSeriesTypes = string[];
/**
 * @maxItems 8
 */
export type Features5 =
  | []
  | [
      | 'sorting'
      | 'filtering'
      | 'grouping'
      | 'search'
      | 'paging'
      | 'column_chooser'
      | 'summaries'
      | 'export'
    ]
  | [
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      )
    ]
  | [
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      )
    ]
  | [
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      )
    ]
  | [
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      )
    ]
  | [
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      )
    ]
  | [
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      )
    ]
  | [
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      ),
      (
        | 'sorting'
        | 'filtering'
        | 'grouping'
        | 'search'
        | 'paging'
        | 'column_chooser'
        | 'summaries'
        | 'export'
      )
    ];
export type EffectivePackageVersion = string | null;
/**
 * @maxItems 2
 */
export type Features6 =
  | []
  | ['target_indicator' | 'ranges']
  | ['target_indicator' | 'ranges', 'target_indicator' | 'ranges'];
/**
 * @minItems 1
 * @maxItems 2
 */
export type Types = ['circular' | 'linear'] | ['circular' | 'linear', 'circular' | 'linear'];
export type MaxBlocks = number;
export type MaxChartCategories = number;
export type MaxChartSeries = number;
/**
 * @maxItems 10
 */
export type Features7 =
  | []
  | [
      | 'rows'
      | 'columns'
      | 'values'
      | 'filtering'
      | 'sorting'
      | 'totals'
      | 'subtotals'
      | 'expand_collapse'
      | 'drilldown'
      | 'export'
    ]
  | [
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      )
    ]
  | [
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      )
    ]
  | [
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      )
    ]
  | [
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      )
    ]
  | [
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      )
    ]
  | [
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      )
    ]
  | [
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      )
    ]
  | [
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      )
    ]
  | [
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      ),
      (
        | 'rows'
        | 'columns'
        | 'values'
        | 'filtering'
        | 'sorting'
        | 'totals'
        | 'subtotals'
        | 'expand_collapse'
        | 'drilldown'
        | 'export'
      )
    ];
export type PresentationCapabilityProfileVersion = '1.0';
export type ProfileId = string;
export type Renderer = string | null;
export type RendererVersion = string | null;
/**
 * @minItems 1
 * @maxItems 20
 */
export type AcceptedMimeTypes =
  | [string]
  | [string, string]
  | [string, string, string]
  | [string, string, string, string]
  | [string, string, string, string, string]
  | [string, string, string, string, string, string]
  | [string, string, string, string, string, string, string]
  | [string, string, string, string, string, string, string, string]
  | [string, string, string, string, string, string, string, string, string]
  | [string, string, string, string, string, string, string, string, string, string]
  | [string, string, string, string, string, string, string, string, string, string, string]
  | [string, string, string, string, string, string, string, string, string, string, string, string]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ]
  | [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ];
export type ActionId1 = string;
export type ConfirmationRequired = boolean;
export type ImportCapabilityDescriptorVersion = '1.0';
export type MaxBytes = number;

export interface IntentClassificationV2 {
  analysis_intent?: AnalysisIntent;
  confidence: Confidence;
  intent: Intent;
  intent_classification_version: IntentClassificationVersion;
  is_erp_related: IsErpRelated;
  missing_information: MissingInformation;
  presentation_preference: PresentationPreferenceV1;
  reason: Reason;
  requires_clarification: RequiresClarification;
  task_kind?: TaskKind;
}
export interface PresentationPreferenceV1 {
  mode: Mode;
  presentation_preference_version: PresentationPreferenceVersion;
  required: Required;
}
export interface QuerySqlDraftV6 {
  parameters: Parameters;
  presentation_plan: PresentationPlanV2;
  proposed_result_semantics: ProposedResultSemanticsV2;
  query_sql_draft_version: QuerySqlDraftVersion;
  sql: Sql;
}
export interface BitParameterDraftV2 {
  name: Name;
  nullable: Nullable;
  sql_type: SqlType;
  value: Value;
}
export interface IntegerParameterDraftV2 {
  name: Name1;
  nullable: Nullable1;
  sql_type: SqlType1;
  value: Value1;
}
export interface DecimalParameterDraftV2 {
  name: Name2;
  nullable: Nullable2;
  precision: Precision;
  scale: Scale;
  sql_type: SqlType2;
  value: Value2;
}
export interface DateParameterDraftV2 {
  name: Name3;
  nullable: Nullable3;
  sql_type: SqlType3;
  value: Value3;
}
export interface DateTimeParameterDraftV2 {
  name: Name4;
  nullable: Nullable4;
  sql_type: SqlType4;
  value: Value4;
}
export interface UniqueIdentifierParameterDraftV2 {
  name: Name5;
  nullable: Nullable5;
  sql_type: SqlType5;
  value: Value5;
}
export interface NVarCharParameterDraftV2 {
  max_length: MaxLength;
  name: Name6;
  nullable: Nullable6;
  sql_type: SqlType6;
  value: Value6;
}
export interface PresentationPlanV2 {
  blocks: Blocks;
  capability_profile: CapabilityProfile;
  layout: PresentationLayoutV1;
  presentation_plan_version: PresentationPlanVersion;
  title: Title5;
}
export interface KpiBlockV1 {
  block_id: BlockId;
  block_version: BlockVersion;
  format?: Format;
  kind: Kind;
  title: Title;
  value: Value7;
}
export interface FieldValueReferenceV1 {
  field: Field;
  source: Source;
}
export interface ResultAggregateValueReferenceV1 {
  aggregation: Aggregation;
  field: Field1;
  scope: Scope;
  source: Source1;
}
export interface ResolvedReferenceValueReferenceV1 {
  reference_id: ReferenceId;
  source: Source2;
}
export interface DataGridBlockV1 {
  block_id: BlockId1;
  block_version: BlockVersion1;
  features?: Features;
  fields: Fields;
  kind: Kind1;
  title: Title1;
}
export interface PivotGridBlockV1 {
  block_id: BlockId2;
  block_version: BlockVersion2;
  columns: Columns;
  features?: Features1;
  kind: Kind2;
  rows: Rows;
  title: Title2;
  values: Values;
}
export interface PivotValueV1 {
  aggregation: Aggregation1;
  field: Field2;
}
export interface ChartBlockV1 {
  block_id: BlockId3;
  block_version: BlockVersion3;
  category_field: CategoryField;
  family: Family;
  kind: Kind3;
  orientation?: Orientation;
  series: Series;
  title: Title3;
}
export interface ChartSeriesV2 {
  aggregation?: Aggregation2;
  axis?: Axis;
  field: Field3;
  label: Label;
  type: Type;
}
export interface GaugeBlockV1 {
  block_id: BlockId4;
  block_version: BlockVersion4;
  gauge_type?: GaugeType;
  kind: Kind4;
  maximum?: Maximum;
  minimum?: Minimum;
  ranges?: Ranges;
  target?: Target;
  title: Title4;
  value: Value8;
}
export interface GaugeRangeV1 {
  end: End;
  label: Label1;
  start: Start;
}
export interface PresentationLayoutV1 {
  columns?: Columns1;
  mode: Mode1;
  presentation_layout_version: PresentationLayoutVersion;
}
export interface ProposedResultSemanticsV2 {
  columns: Columns2;
  result_set: ResultSetSemanticsV1;
  shape: Shape;
  version: Version;
}
export interface ProposedSemanticColumnV2 {
  aggregation: Aggregation3;
  key: Key;
  ordinal: Ordinal;
  presentation_support?: PresentationSupport;
  proposed_semantic_column_version: ProposedSemanticColumnVersion;
  role: Role;
  semantic_type: SemanticType;
}
export interface ResultSetSemanticsV1 {
  result_set_semantics_version: ResultSetSemanticsVersion;
  selection: Selection;
}
export interface AllMatchesSelectionV1 {
  kind: Kind5;
}
export interface TopNSelectionV1 {
  direction: Direction;
  kind: Kind6;
  limit: Limit;
  order_field: OrderField;
}
export interface SampleSelectionV1 {
  kind: Kind7;
  limit: Limit1;
}
export interface ResolvedBusinessReferenceContextV1 {
  references: References;
  resolved_business_reference_context_version: ResolvedBusinessReferenceContextVersion;
}
export interface ResolvedBusinessReferenceV1 {
  label: Label2;
  reference_id: ReferenceId1;
  reference_type: ReferenceType;
  resolved_at: ResolvedAt;
  resolved_business_reference_version: ResolvedBusinessReferenceVersion;
  semantic_type: SemanticType1;
  source_id: SourceId;
  value: Value9;
}
export interface PresentationBlockResolutionV1 {
  block_id: BlockId5;
  code?: Code;
  message?: Message;
  presentation_block_resolution_version: PresentationBlockResolutionVersion;
  status: Status;
}
export interface MaterializedPresentationV2 {
  blocks: Blocks1;
  capability_profile: CapabilityProfile1;
  layout: PresentationLayoutV1;
  materialized_presentation_version: MaterializedPresentationVersion;
  resolutions: Resolutions;
  title: Title11;
}
export interface MaterializedKpiBlockV1 {
  block_id: BlockId6;
  block_version: BlockVersion5;
  format: Format1;
  kind: Kind8;
  scope: MaterializedScopeV1;
  title: Title6;
  value: Value10;
}
export interface MaterializedScopeV1 {
  kind: Kind9;
  label?: Label3;
}
export interface MaterializedGridBlockV1 {
  block_id: BlockId7;
  block_version: BlockVersion6;
  features?: Features2;
  fields: Fields1;
  kind: Kind10;
  title: Title7;
}
export interface MaterializedPivotBlockV1 {
  block_id: BlockId8;
  block_version: BlockVersion7;
  columns: Columns3;
  features?: Features3;
  kind: Kind11;
  rows: Rows1;
  title: Title8;
  values: Values1;
}
export interface MaterializedPivotValueV1 {
  aggregation: Aggregation4;
  field: Field4;
}
export interface MaterializedChartBlockV1 {
  block_id: BlockId9;
  block_version: BlockVersion8;
  category_field: CategoryField1;
  family: Family1;
  kind: Kind12;
  orientation?: Orientation1;
  series: Series1;
  title: Title9;
}
export interface MaterializedChartSeriesV1 {
  axis?: Axis1;
  field: Field5;
  label: Label4;
  type: Type1;
}
export interface MaterializedGaugeBlockV1 {
  block_id: BlockId10;
  block_version: BlockVersion9;
  gauge_type?: GaugeType1;
  kind: Kind13;
  maximum?: Maximum1;
  minimum?: Minimum1;
  ranges?: Ranges1;
  target?: Target1;
  title: Title10;
  value: Value11;
}
export interface MaterializedGaugeRangeV1 {
  end: End1;
  label: Label5;
  start: Start1;
}
export interface QueryResultV2 {
  applied_filters: AppliedFilters;
  columns: Columns4;
  execution: QueryResultExecutionV2;
  presentation: MaterializedPresentationV2;
  query_id: QueryId;
  query_result_version: QueryResultVersion;
  result_fingerprint: ResultFingerprint;
  result_id: ResultId;
  row_count: RowCount;
  rows: Rows2;
  semantics: ProposedResultSemanticsV2;
  status: Status1;
}
export interface QueryAppliedFilterV2 {
  display: Display;
  end_exclusive?: EndExclusive;
  key: Key1;
  label: Label6;
  start?: Start2;
  type: Type2;
  value?: Value12;
}
export interface QueryResultColumnV2 {
  aggregation: Aggregation5;
  format?: QueryResultFormatV2 | null;
  key: Key2;
  nullable: Nullable7;
  semantic_type: SemanticType2;
  title: Title12;
  type: Type3;
}
export interface QueryResultFormatV2 {
  currency?: Currency;
  style: Style;
}
export interface QueryResultExecutionV2 {
  ast_fingerprint: AstFingerprint;
  catalog_sha256: CatalogSha256;
  duration_ms: DurationMs;
  truncated: Truncated;
}
export interface AssistantClientStreamEventV2 {
  conversation_id: ConversationId;
  event_id: EventId;
  event_version: EventVersion;
  payload: Payload;
  request_id: RequestId;
  sequence: Sequence;
  timestamp: Timestamp;
  turn_id: TurnId;
  type: Type4;
}
export interface Payload {
  [k: string]: any;
}
export interface AssistantHistoricalResultV2 {
  executed_at: ExecutedAt;
  historical_result_version: HistoricalResultVersion;
  query_artifact: QueryArtifactV1 | null;
  query_execution_id: QueryExecutionId;
  requery: RequeryCapabilityV1;
  result: QueryResultV2 | null;
  snapshot_status: SnapshotStatus;
}
export interface QueryArtifactV1 {
  ast_fingerprint: AstFingerprint1;
  capability_profile: CapabilityProfile2;
  catalog_sha256: CatalogSha2561;
  parameters: Parameters1;
  presentation_plan: PresentationPlanV2;
  query_artifact_id: QueryArtifactId;
  query_artifact_version: QueryArtifactVersion;
  requery: RequeryCapabilityV1;
  semantics: ProposedResultSemanticsV2;
  sql: Sql1;
}
export interface QueryArtifactParameterV1 {
  max_length?: MaxLength1;
  name: Name7;
  nullable: Nullable8;
  precision?: Precision1;
  query_artifact_parameter_version: QueryArtifactParameterVersion;
  rebindable: Rebindable;
  scale?: Scale1;
  semantic_role: SemanticRole;
  sql_type: SqlType7;
  value?: Value13;
}
export interface RequeryCapabilityV1 {
  available: Available;
  mode: Mode2;
  rebindable_parameters: RebindableParameters;
  requery_capability_version: RequeryCapabilityVersion;
}
export interface AssistantHistoricalRequeryResultV2 {
  historical_requery_result_version: HistoricalRequeryResultVersion;
  query_artifact_id: QueryArtifactId1;
  query_execution_id: QueryExecutionId1;
  result: QueryResultV2;
}
export interface DashboardDefinitionV1 {
  dashboard_definition_version: DashboardDefinitionVersion;
  dashboard_id: DashboardId;
  global_filters: GlobalFilters;
  grid_layout: DashboardGridLayoutV1;
  status: Status2;
  title: Title13;
  widgets: Widgets;
}
export interface DashboardFilterV1 {
  dashboard_filter_version: DashboardFilterVersion;
  filter_id: FilterId;
  label: Label7;
  required?: Required1;
  type: Type5;
}
export interface DashboardGridLayoutV1 {
  columns: Columns5;
  row_height: RowHeight;
}
export interface DashboardWidgetV1 {
  block_id: BlockId11;
  dashboard_widget_version: DashboardWidgetVersion;
  filter_bindings: FilterBindings;
  layout: DashboardWidgetLayoutV1;
  query_artifact_id: QueryArtifactId2;
  widget_id: WidgetId;
}
export interface DashboardFilterBindingV1 {
  dashboard_filter_binding_version: DashboardFilterBindingVersion;
  filter_id: FilterId1;
  mappings: Mappings;
}
export interface DashboardFilterMappingV1 {
  dashboard_filter_mapping_version: DashboardFilterMappingVersion;
  source_path: SourcePath;
  target_parameter: TargetParameter;
}
export interface DashboardWidgetLayoutV1 {
  h: H;
  w: W;
  x: X;
  y: Y;
}
export interface DashboardStreamEventV1 {
  dashboard_id: DashboardId1;
  event_id: EventId1;
  event_version: EventVersion1;
  payload: Payload1;
  sequence: Sequence1;
  timestamp: Timestamp1;
  type: Type6;
  widget_id?: WidgetId1;
}
export interface Payload1 {
  [k: string]: any;
}
export interface DashboardResultV1 {
  dashboard_id: DashboardId2;
  dashboard_result_version: DashboardResultVersion;
  status: Status3;
  widgets: Widgets1;
}
export interface DashboardWidgetResultV1 {
  block?: Block;
  error_code?: ErrorCode;
  status: Status4;
  widget_id: WidgetId2;
}
export interface ImportOperationV1 {
  action_id: ActionId;
  entity: Entity;
  import_operation_version: ImportOperationVersion;
  operation: Operation;
  policy_id: PolicyId;
  write_mode: WriteMode;
}
export interface ImportPreflightV1 {
  attachment_sha256: AttachmentSha256;
  import_preflight_version: ImportPreflightVersion;
  issues: Issues;
  mapping: ImportMappingV1;
  operation: ImportOperationV1;
  preflight_id: PreflightId;
  preview: ImportPreviewV1;
  status: Status5;
}
export interface ImportIssueV1 {
  code: Code1;
  import_issue_version: ImportIssueVersion;
  message: Message1;
  row?: Row;
  severity: Severity;
  source_column?: SourceColumn;
  target_field?: TargetField;
}
export interface ImportMappingV1 {
  entries: Entries;
  import_mapping_version: ImportMappingVersion;
  mapping_id: MappingId;
  version: Version1;
}
export interface ImportMappingEntryV1 {
  required: Required2;
  source_column: SourceColumn1;
  target_field: TargetField1;
}
export interface ImportPreviewV1 {
  columns: Columns6;
  import_preview_version: ImportPreviewVersion;
  rows: Rows3;
  truncated: Truncated1;
}
export interface ImportPreviewRowV1 {
  row: Row1;
  valid: Valid;
  values: Values2;
}
export interface Values2 {
  [k: string]: string | number | boolean | null;
}
export interface ImportExecutionRequestV1 {
  attachment_sha256: AttachmentSha2561;
  confirmation: ImportConfirmationV1;
  import_execution_request_version: ImportExecutionRequestVersion;
  mapping_id: MappingId1;
  mapping_version: MappingVersion;
  operation: ImportOperationV1;
  policy_state: PolicyState;
  preflight_id: PreflightId1;
}
export interface ImportConfirmationV1 {
  confirmation_id?: ConfirmationId;
  state: State;
}
export interface ImportResultV1 {
  attachment_sha256: AttachmentSha2562;
  import_id: ImportId;
  import_result_version: ImportResultVersion;
  issues: Issues1;
  preflight_id: PreflightId2;
  status: Status6;
  summary: ImportCountSummaryV1;
}
export interface ImportCountSummaryV1 {
  created: Created;
  failed: Failed;
  received: Received;
  skipped: Skipped;
  updated: Updated;
  valid: Valid1;
}
export interface ImportStreamEventV1 {
  event_id: EventId2;
  event_version: EventVersion2;
  import_id: ImportId1;
  payload: Payload2;
  preflight_id: PreflightId3;
  sequence: Sequence2;
  timestamp: Timestamp2;
  type: Type7;
}
export interface Payload2 {
  [k: string]: any;
}
export interface PresentationCapabilityProfileV1 {
  aggregations: Aggregations;
  block_kinds: BlockKinds;
  chart?: ChartCapabilitiesV1 | null;
  chart_families: ChartFamilies;
  chart_series_types: ChartSeriesTypes;
  data_grid?: DataGridCapabilitiesV1 | null;
  effective_package_version?: EffectivePackageVersion;
  gauge?: GaugeCapabilitiesV1 | null;
  max_blocks: MaxBlocks;
  max_chart_categories: MaxChartCategories;
  max_chart_series: MaxChartSeries;
  pivot_grid?: PivotGridCapabilitiesV1 | null;
  presentation_capability_profile_version: PresentationCapabilityProfileVersion;
  profile_id: ProfileId;
  renderer?: Renderer;
  renderer_version?: RendererVersion;
}
export interface ChartCapabilitiesV1 {
  family_series_compatibility: FamilySeriesCompatibility;
  features: Features4;
  orientations: Orientations;
  stacking_modes: StackingModes;
}
export interface ChartFamilySeriesCompatibilityV1 {
  family: Family2;
  series_types: SeriesTypes;
}
export interface DataGridCapabilitiesV1 {
  features: Features5;
}
export interface GaugeCapabilitiesV1 {
  features: Features6;
  types: Types;
}
export interface PivotGridCapabilitiesV1 {
  features: Features7;
}
export interface ImportCapabilityDescriptorV1 {
  accepted_mime_types: AcceptedMimeTypes;
  action_id: ActionId1;
  confirmation_required: ConfirmationRequired;
  import_capability_descriptor_version: ImportCapabilityDescriptorVersion;
  max_bytes: MaxBytes;
  operation: ImportOperationV1;
}

